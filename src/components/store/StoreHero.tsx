import React, { useEffect, useRef } from 'react';
import { StoreLocation } from '../../mock/storeData';
import '../../styles/tnfStoreStyles.css';
import './StoreHero.css';

interface StoreHeroProps {
  store: StoreLocation;
  googleMapsApiKey?: string;
}

/**
 * 店舗メイン情報を表示するコンポーネント
 * Google Maps APIを使用して地図表示および店舗情報を表示
 */
const StoreHero: React.FC<StoreHeroProps> = ({
  store,
  googleMapsApiKey = 'dummyKey' // 実際の運用では環境変数から取得
}) => {
  // Google Mapの参照
  const mapRef = useRef<HTMLDivElement>(null);

  // 店舗タイプ表示用の変換関数
  const getShopTypeLabel = (type: string): string => {
    switch (type) {
      case 'directly':
        return '直営店';
      case 'outlet':
        return 'アウトレット店';
      default:
        return type;
    }
  };

  // マップ初期化（ダミー表示）
  useEffect(() => {
    if (mapRef.current) {
      // 開発環境では常にモックマップを表示
      mapRef.current.innerHTML = `
        <div class="mock-map">
          <div class="mock-map-pin"></div>
          <div class="mock-map-info">
            <strong>${store.name}</strong><br>
            ${store.address.region}${store.address.city}${store.address.line1}
          </div>
        </div>
      `;
    }
    
    // Note: 実際の実装ではGoogle Maps APIを使用
    // このコードは、API連携が必要になった際に実装
    
    /*
    // 実装例
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // グローバルコールバック関数を定義
      window.initMap = initializeMap;
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    };
    */
    
  }, [store]);

  return (
    <div className="shop-detail">
      {/* 店舗名とタイプ */}
      <h1 className="page-title">
        <span>
          <span id="shop-name">{store.name}</span>
          {store.c_shopType && (
            <span id="service">{getShopTypeLabel(store.c_shopType)}</span>
          )}
        </span>
      </h1>
      
      <div className="shop-detail-overview">
        {/* Google Map表示エリア */}
        <div id="shopMap" ref={mapRef} className="shop-map"></div>
        
        {/* 店舗情報テーブル */}
        <div className="shop-detail-info">
          {/* 住所 */}
          <dl className="shop-detail-address">
            <dt>住所</dt>
            <dd>
              <span id="shopAddress">
                〒{store.address.postalCode}<br/>
                {store.address.region}{store.address.city}{store.address.line1}
                {store.address.line2 && <><br/>{store.address.line2}</>}
              </span>
            </dd>
          </dl>
          
          {/* 電話番号 */}
          <dl className="shop-detail-tel">
            <dt>電話番号</dt>
            <dd>
              <span id="shopTel">
                <a href={`tel:${store.mainPhone}`}>{store.mainPhone}</a>
              </span>
            </dd>
          </dl>
          
          {/* アクティビティ */}
          {store.c_activities && store.c_activities.length > 0 && (
            <dl className="shop-detail-activity">
              <dt>アクティビティ</dt>
              <dd>
                <ul id="shopActivity" className="shop-activity">
                  {store.c_activities.map((activity) => (
                    <li key={activity.id} className={activity.id}>
                      <span className="activity-image">
                        <img
                          src={activity.iconUrl}
                          alt={activity.name}
                        />
                      </span>
                      <span>{activity.name}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          )}
          
          {/* 取扱タイプ */}
          {store.c_gender && store.c_gender.length > 0 && (
            <dl className="shop-detail-type">
              <dt>取扱タイプ</dt>
              <dd className="shop-gender">
                <span id="gender">
                  {store.c_gender.map((gender, idx) => (
                    <React.Fragment key={gender.id}>
                      <span>{gender.name}</span>
                      {idx < store.c_gender!.length - 1 && <span className="gender-separator">・</span>}
                    </React.Fragment>
                  ))}
                </span>
              </dd>
            </dl>
          )}
          
          {/* ショップSNS */}
          <dl className="shop-detail-sns">
            <dt>ショップSNS</dt>
            <dd className="shop-sns">
              <ul>
                {store.c_blogUrl && (
                  <li>
                    <a href={store.c_blogUrl} target="_blank" rel="noopener noreferrer" className="shop-blog">
                      ブログ
                    </a>
                  </li>
                )}
                {store.c_instagramUrl && (
                  <li>
                    <a href={store.c_instagramUrl} target="_blank" rel="noopener noreferrer" className="shop-instagram">
                      instagram
                    </a>
                  </li>
                )}
                {store.c_twitterUrl && (
                  <li>
                    <a href={store.c_twitterUrl} target="_blank" rel="noopener noreferrer" className="shop-twitter">
                      twitter
                    </a>
                  </li>
                )}
                {store.c_facebookUrl && (
                  <li>
                    <a href={store.c_facebookUrl} target="_blank" rel="noopener noreferrer" className="shop-facebook">
                      facebook
                    </a>
                  </li>
                )}
                {store.c_youtubeUrl && (
                  <li>
                    <a href={store.c_youtubeUrl} target="_blank" rel="noopener noreferrer" className="shop-youtube">
                      youtube
                    </a>
                  </li>
                )}
              </ul>
            </dd>
          </dl>
          
          {/* 店舗サービス */}
          {store.c_services && store.c_services.length > 0 && (
            <dl className="shop-detail-services">
              <dt>店舗サービス</dt>
              <dd className="shop-services">
                {store.c_services.map((service, index) => (
                  <span key={service.id} className="service-icon-wrapper">
                    <img
                      src={`/assets/images/icons/${service.icon}.svg`}
                      alt={service.name}
                      className="service-icon"
                    />
                    <span className="service-name">{service.name}</span>
                  </span>
                ))}
              </dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreHero;