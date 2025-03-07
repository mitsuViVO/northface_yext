# THE NORTH FACE店舗ページ実装計画書 - Part 3: コア機能コンポーネント

## 1. コンポーネント設計概要

店舗詳細ページの主要コンポーネントを、元サイトの挙動を完全に再現するために詳細に設計します。特に、STAFF STYLEとSHOP BLOGコンポーネントは元サイトを完全に模倣することを最優先します。

コンポーネント設計の基本方針:
- 再利用可能なコンポーネント構造
- 適切な状態管理（ローカルステートとコンテキスト）
- エラー処理とフォールバックUI
- パフォーマンス最適化（遅延読み込み、メモ化など）
- アクセシビリティ対応

## 2. StoreHero（店舗メイン情報）コンポーネント

GoogleマップとともにTHE NORTH FACE店舗のメイン情報を表示するコンポーネントです。

### 2.1 機能要件

- Google Maps APIを使用した地図表示
- 店舗情報（名前、住所、電話番号など）の表示
- アクティビティアイコンの表示
- 取扱タイプの表示
- ショップSNSリンクの表示
- 店舗サービスアイコンの表示（該当する場合）

### 2.2 コンポーネント構造

```jsx
// StoreHero.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/StoreHero.css';

const StoreHero = ({ store, googleMapsApiKey = 'YOUR_API_KEY' }) => {
  // Google Mapの参照
  const mapRef = useRef(null);
  // マップインスタンス参照
  const mapInstanceRef = useRef(null);
  // マーカー参照
  const markerRef = useRef(null);
  
  // Google Mapの初期化
  useEffect(() => {
    // Maps APIスクリプト読み込みロジック
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // グローバルコールバック関数
      window.initMap = () => initializeMap();
      
      document.head.appendChild(script);
      
      return () => {
        // クリーンアップ
        window.initMap = null;
        document.head.removeChild(script);
      };
    } else {
      // すでに読み込まれている場合は直接初期化
      initializeMap();
    }
  }, [store]);
  
  // マップ初期化関数
  const initializeMap = () => {
    if (!mapRef.current || !store.yextDisplayCoordinate) return;
    
    // 店舗の位置情報
    const location = {
      lat: store.yextDisplayCoordinate.latitude,
      lng: store.yextDisplayCoordinate.longitude
    };
    
    // マップオプション
    const mapOptions = {
      zoom: 17,
      center: location,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };
    
    // マップ、マーカー、情報ウィンドウ作成
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: store.name,
      animation: window.google.maps.Animation.DROP
    });
    
    // マーカークリック時の情報ウィンドウ
    const infoContent = `
      <div class="map-info-window">
        <strong>${store.name}</strong><br>
        ${store.address.region}${store.address.city}${store.address.line1}${store.address.line2 || ''}
      </div>
    `;
    
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoContent
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    
    // 初期表示時に情報ウィンドウを表示
    infoWindow.open(map, marker);
    
    // 参照を保存
    mapInstanceRef.current = map;
    markerRef.current = marker;
  };
  
  // 店舗タイプ表示変換関数
  const getShopTypeLabel = (type) => {
    switch(type) {
      case 'directly': return '直営店';
      case 'outlet': return 'アウトレット店';
      default: return type;
    }
  };
  
  return (
    <div className="shop_detail">
      {/* 店舗名とタイプ */}
      <h1 className="page-title">
        <span>
          <span id="shop_name">{store.name}</span>
          {store.c_shopType && (
            <span id="service">{getShopTypeLabel(store.c_shopType)}</span>
          )}
        </span>
      </h1>
      
      <div className="shop_detail_overview clearfix">
        {/* Google Map表示エリア */}
        <div id="shopMap" ref={mapRef}></div>
        
        {/* 店舗情報テーブル */}
        <div className="shop_detail_info">
          {/* 住所 */}
          <dl className="shop_detail_address">
            <dt>住所</dt>
            <dd>
              <span id="shopAddress">
                〒{store.address.postalCode}<br/>
                {store.address.region}{store.address.city}{store.address.line1}{store.address.line2 || ''}
              </span>
            </dd>
          </dl>
          
          {/* 電話番号 */}
          <dl className="shop_detail_tel">
            <dt>電話番号</dt>
            <dd>
              <span id="shopTel">
                <a href={`tel:${store.mainPhone}`}>{store.mainPhone}</a>
              </span>
            </dd>
          </dl>
          
          {/* アクティビティ */}
          {store.c_activities && store.c_activities.length > 0 && (
            <dl className="shop_detail_activity">
              <dt>アクティビティ</dt>
              <dd>
                <ul id="shopActivity" className="shop_activity">
                  {store.c_activities.map((activity) => (
                    <li key={activity.id} className={activity.id}>
                      <span className="activity_image">
                        <img 
                          src={`/assets/images/svg/${activity.id}.svg`} 
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
            <dl className="shop_detail_type">
              <dt>取扱タイプ</dt>
              <dd className="shop_gender">
                <span id="gender">
                  {store.c_gender.map((gender, idx) => (
                    <span key={idx}>{gender.name}</span>
                  ))}
                </span>
              </dd>
            </dl>
          )}
          
          {/* ショップSNS */}
          <dl className="shop_detail_sns">
            <dt>ショップSNS</dt>
            <dd className="shop_sns">
              <ul>
                {store.c_blogUrl && (
                  <li>
                    <a href={store.c_blogUrl} target="_blank" rel="noopener noreferrer" className="shop_blog">
                      ブログ
                    </a>
                  </li>
                )}
                {store.c_instagramUrl && (
                  <li>
                    <a href={store.c_instagramUrl} target="_blank" rel="noopener noreferrer" className="shop_instagram">
                      instagram
                    </a>
                  </li>
                )}
                {/* 他のSNSリンク */}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StoreHero;
```

## 3. StaffStyle（スタッフスタイル）コンポーネント

店舗スタッフのコーディネート一覧を表示する、THE NORTH FACEの特徴的なコンポーネントです。

### 3.1 機能要件

- Staff Start APIからのスタイリングデータ取得
- 3列グリッドでのスタイリングカード表示
- 画像のホバーエフェクト（拡大・シャドウ）
- アニメーション効果（フェードイン、上下移動）
- 「もっと見る」ボタン
- ローディング状態の表示
- エラー処理

### 3.2 コンポーネント構造

```jsx
// StaffStyle.jsx
import React, { useState, useEffect } from 'react';
import { fetchStaffStyles } from '../api/staffStartApi';
import '../styles/StaffStyle.css';

// モックデータ（開発/テスト用）
const mockStaffStyles = [
  {
    id: "style1",
    cid: "style1",
    image_url: "https://static.staff-start.com/img/coordinate/65/ecc63deecec609482911c7e614a83e87-24529/132bd16a-7a3b-4f3b-82d7-28f8064d4a38.jpg",
    title: "2023秋冬コーディネート",
    published_at: "2023-10-20T12:00:00"
  },
  {
    id: "style2",
    cid: "style2",
    image_url: "https://static.staff-start.com/img/coordinate/65/ecc63deecec609482911c7e614a83e87-24529/132bd16a-7a3b-4f3b-82d7-28f8064d4a38.jpg",
    title: "アウトドアスタイル",
    published_at: "2023-10-15T15:30:00"
  },
  {
    id: "style3",
    cid: "style3",
    image_url: "https://static.staff-start.com/img/coordinate/65/ecc63deecec609482911c7e614a83e87-24529/132bd16a-7a3b-4f3b-82d7-28f8064d4a38.jpg",
    title: "トレッキングコーデ",
    published_at: "2023-10-10T09:15:00"
  }
];

const StaffStyle = ({ storeId, initialStyles, displayCount = 3 }) => {
  // スタイリングデータstate
  const [styles, setStyles] = useState(initialStyles || []);
  // 読み込み状態state
  const [loading, setLoading] = useState(!initialStyles);
  // エラー状態state
  const [error, setError] = useState(null);
  
  // コンポーネントマウント時にデータ取得
  useEffect(() => {
    if (!initialStyles) {
      loadStaffStyles();
    }
  }, [storeId, initialStyles]);
  
  // スタイリングデータ取得関数
  const loadStaffStyles = async () => {
    setLoading(true);
    try {
      // 開発環境ではモックデータを使用
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          setStyles(mockStaffStyles);
          setLoading(false);
        }, 500);
        return;
      }
      
      // 本番環境では実際のAPIを呼び出す
      const data = await fetchStaffStyles(storeId, displayCount);
      setStyles(data);
    } catch (err) {
      console.error('Failed to load staff styles:', err);
      setError('スタイリングデータの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // データがない場合は表示しない
  if (!loading && (styles.length === 0 || error)) {
    return null;
  }
  
  // 画像読み込みエラー時の処理
  const handleImageError = (e) => {
    e.target.src = '/static/full/images/no-image.png';
  };
  
  return (
    <div className="store_style">
      {/* セクションタイトル */}
      <h2 className="section-title">STAFF STYLE</h2>
      
      {/* メインコンテンツ */}
      <div className="section_detail">
        {loading ? (
          // ローディング表示
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          // スタイリングカードグリッド
          <ul id="styling_container" className="goods_list">
            {styles.map((style, index) => (
              <li 
                key={style.id || style.cid} 
                id={style.cid} 
                className="goods_item fade-in-item"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <a 
                  href={`/styling/i/?cid=${style.cid || style.id}&aid3=shopdetail_coordinate_${storeId}`} 
                  className="goods_link"
                  onClick={() => {
                    // アナリティクスイベント送信
                    if (window.naviplusView) {
                      window.naviplusView(storeId);
                    }
                    
                    // GTM イベント送信
                    if (window.dataLayer) {
                      window.dataLayer.push({
                        'event': 'staff_style_click',
                        'storeId': storeId,
                        'styleId': style.cid || style.id
                      });
                    }
                  }}
                >
                  {/* 画像 */}
                  <div className="goods_image">
                    <img 
                      src={style.image_url || style.imageUrl} 
                      alt={style.title || `スタイル ${style.id}`}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* もっと見るボタン */}
      <div className="more_btn">
        <a 
          href={`/styling/?shop=${storeId}`} 
          className="default-btn btn-back"
          onClick={() => {
            // アナリティクスイベント送信
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'view_more_styles',
                'storeId': storeId
              });
            }
          }}
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

export default StaffStyle;
```

## 4. ShopBlog（ショップブログ）コンポーネント

店舗ブログの最新記事を表示する、THE NORTH FACEの重要なコンポーネントです。

### 4.1 機能要件

- Staff Start APIからのブログデータ取得
- 3列グリッドでのブログカード表示
- 画像・日付・タイトルの表示
- ホバーエフェクト（拡大・シャドウ）
- アニメーション効果（フェードイン）
- 「もっと見る」ボタン
- ローディング状態の表示
- エラー処理

### 4.2 コンポーネント構造

```jsx
// ShopBlog.jsx
import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../api/staffStartApi';
import '../styles/ShopBlog.css';

// モックデータ（開発/テスト用）
const mockBlogPosts = [
  {
    article_id: "blog1",
    resized_main_images: {
      m: "https://static.staff-start.com/img/articles/title/65/f47dafa1b01fc67850d5576e5216df25-24939/91f07ce53a21145bfb76f4a2e9656b53_m.jpg"
    },
    first_published_at: "2023-10-15T10:30:00",
    title: "秋の新作アイテム入荷しました！"
  },
  {
    article_id: "blog2",
    resized_main_images: {
      m: "https://static.staff-start.com/img/articles/title/65/f47dafa1b01fc67850d5576e5216df25-24939/91f07ce53a21145bfb76f4a2e9656b53_m.jpg"
    },
    first_published_at: "2023-10-10T15:45:00",
    title: "おすすめトレッキングコース特集"
  },
  {
    article_id: "blog3",
    resized_main_images: {
      m: "https://static.staff-start.com/img/articles/title/65/f47dafa1b01fc67850d5576e5216df25-24939/91f07ce53a21145bfb76f4a2e9656b53_m.jpg"
    },
    first_published_at: "2023-10-05T09:20:00",
    title: "スタッフおすすめキャンプギア"
  }
];

const ShopBlog = ({ storeId, initialPosts, displayCount = 3 }) => {
  // ブログ記事state
  const [posts, setPosts] = useState(initialPosts || []);
  // 読み込み状態state
  const [loading, setLoading] = useState(!initialPosts);
  // エラー状態state
  const [error, setError] = useState(null);
  
  // コンポーネントマウント時にデータ取得
  useEffect(() => {
    if (!initialPosts) {
      loadBlogPosts();
    }
  }, [storeId, initialPosts]);
  
  // ブログデータ取得関数
  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      // 開発環境ではモックデータを使用
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          setPosts(mockBlogPosts);
          setLoading(false);
        }, 500);
        return;
      }
      
      // 本番環境では実際のAPIを呼び出す
      const data = await fetchBlogPosts(storeId, displayCount);
      setPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
      setError('ブログデータの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // データがない場合は表示しない
  if (!loading && (posts.length === 0 || error)) {
    return null;
  }
  
  // 日付フォーマット関数
  const formatDate = (dateString) => {
    return dateString.slice(0, 10).replace(/-/g, '.');
  };
  
  // 画像読み込みエラー時の処理
  const handleImageError = (e) => {
    e.target.src = '/static/full/images/no-image.png';
  };
  
  return (
    <div className="store_blog">
      {/* セクションタイトル */}
      <h2 className="section-title">SHOP BLOG</h2>
      
      {/* メインコンテンツ */}
      <div className="section_detail">
        {loading ? (
          // ローディング表示
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          // ブログカードグリッド
          <ul id="blog_container">
            {posts.map((post, index) => (
              <li 
                key={post.article_id}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <a 
                  href={`/blog/i/?article_id=${post.article_id}&aid3=shopdetail_blog_${storeId}`}
                  onClick={() => {
                    // アナリティクスイベント送信
                    if (window.dataLayer) {
                      window.dataLayer.push({
                        'event': 'blog_post_click',
                        'blogId': post.article_id,
                        'blogTitle': post.title
                      });
                    }
                  }}
                >
                  {/* サムネイル画像 */}
                  <span className="store_blog_photo">
                    <img 
                      src={post.resized_main_images?.m || post.image_url} 
                      alt={post.title}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </span>
                  
                  {/* 投稿日 */}
                  <span className="store_blog_date">
                    {formatDate(post.first_published_at)}
                  </span>
                  
                  {/* タイトル */}
                  <span className="store_blog_title">
                    {post.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* もっと見るボタン */}
      <div className="more_btn">
        <a 
          href={`/blog/?shop=${storeId}`} 
          className="default-btn btn-back"
          onClick={() => {
            // アナリティクスイベント送信
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'view_more_blogs',
                'storeId': storeId
              });
            }
          }}
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

export default ShopBlog;
```

## 5. Breadcrumbs（パンくずリスト）コンポーネント

店舗ページへのナビゲーションパスを表示するコンポーネントです。

### 5.1 実装

```jsx
// Breadcrumbs.jsx
import React from 'react';
import { Link } from '@yext/pages/components';
import '../styles/Breadcrumbs.css';

const Breadcrumbs = ({ store }) => {
  return (
    <div className="bread clearfix">
      <ol>
        <li><Link href="/">トップ</Link></li>
        <li><Link href="/tnf/">THE NORTH FACE</Link></li>
        <li><Link href="/tnf/shoplist/">SHOP LIST</Link></li>
        <li><strong>{store.name}</strong></li>
      </ol>
    </div>
  );
};

export default Breadcrumbs;
```

## 6. StoreGallery（店舗ギャラリー）コンポーネント

店舗の画像ギャラリーを表示するコンポーネントです。

### 6.1 実装

```jsx
// StoreGallery.jsx
import React from 'react';
import '../styles/StoreGallery.css';

const StoreGallery = ({ photos = [] }) => {
  // 画像がない場合は何も表示しない
  if (photos.length === 0) return null;

  return (
    <div className="store_gallery">
      <h2 className="section-title">STORE GALLERY</h2>
      <div className="section_detail">
        {photos.map((photo, index) => (
          <img 
            key={index} 
            id="shopImg" 
            src={photo.image.url} 
            alt={photo.image.alternateText || "店舗画像"} 
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default StoreGallery;
```

## 7. API連携モジュール

外部APIとの連携を担当するモジュールです。

### 7.1 Staff Start API連携

```jsx
// staffStartApi.js
/**
 * Staff Start APIからスタイリングデータを取得
 * @param shopCode 店舗コード
 * @param count 取得件数
 * @returns スタイリングデータ配列
 */
export async function fetchStaffStyles(shopCode, count = 10) {
  try {
    const params = new URLSearchParams({
      count: count.toString(),
      shop_code: shopCode,
      sort: 'time'
    });
    
    const response = await fetch(`/api/staff-start/coordinates?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 1) {
      console.error('Staff Start API error:', data);
      return [];
    }
    
    return data.item.map(item => ({
      id: item.cid,
      cid: item.cid,
      imageUrl: item.image_url || (item.resized_main_images && item.resized_main_images[0] && item.resized_main_images[0].m),
      title: item.title || '',
      publishedAt: item.published_at || ''
    }));
  } catch (error) {
    console.error('Error fetching staff styles:', error);
    throw error;
  }
}

/**
 * Staff Start APIからブログ記事データを取得
 * @param shopCode 店舗コード
 * @param count 取得件数
 * @returns ブログ記事データ配列
 */
export async function fetchBlogPosts(shopCode, count = 10) {
  try {
    const params = new URLSearchParams({
      count: count.toString(),
      shop_code: shopCode,
      sort: 'time'
    });
    
    const response = await fetch(`/api/staff-start/articles?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 1) {
      console.error('Staff Start API error:', data);
      return [];
    }
    
    return data.item;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}