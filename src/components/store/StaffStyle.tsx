import React, { useState, useEffect } from 'react';
import { StaffStyle as StaffStyleType, fetchStaffStyles } from '../../mock/staffStyleData';
import '../../styles/tnfStoreStyles.css';
import './StaffStyle.css';

interface StaffStyleProps {
  storeId: string;
  initialStyles?: StaffStyleType[];
  displayCount?: number;
}

/**
 * スタッフスタイルコンポーネント
 * 店舗スタッフのコーディネート一覧を表示
 */
const StaffStyle: React.FC<StaffStyleProps> = ({ 
  storeId, 
  initialStyles, 
  displayCount = 3 
}) => {
  // スタイリングデータstate
  const [styles, setStyles] = useState<StaffStyleType[]>(initialStyles || []);
  // 読み込み状態state
  const [loading, setLoading] = useState<boolean>(!initialStyles);
  // エラー状態state
  const [error, setError] = useState<string | null>(null);
  
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
      // モックAPIからデータ取得
      const data = await fetchStaffStyles(storeId, displayCount);
      setStyles(data);
    } catch (err) {
      console.error('Failed to load staff styles:', err);
      setError('スタイリングデータの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // データがない場合は何も表示しない
  if (!loading && (styles.length === 0 || error)) {
    return null;
  }
  
  // 画像読み込みエラー時の処理
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/no-image.png';
  };
  
  return (
    <div className="store-style">
      {/* セクションタイトル */}
      <h2 className="tnf-section-title">STAFF STYLE</h2>
      
      {/* メインコンテンツ */}
      <div className="tnf-container">
        {loading ? (
          // ローディング表示
          <div className="tnf-loading-spinner">
            <div className="tnf-spinner"></div>
          </div>
        ) : (
          // スタイリングカードグリッド
          <ul className="style-grid">
            {styles.map((style, index) => (
              <li 
                key={style.id || style.cid} 
                className="style-item"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  opacity: 0, 
                  animation: 'tnfFadeIn 0.6s ease forwards'
                }}
              >
                <a 
                  href={style.url || `/styling/i/?cid=${style.cid}&aid3=shopdetail_coordinate_${storeId}`} 
                  className="style-link"
                  onClick={() => {
                    // アナリティクスイベント送信（本番実装時に追加）
                    console.log(`Style clicked: ${style.id}`);
                  }}
                >
                  {/* 画像 */}
                  <div className="style-image-container">
                    <img 
                      src={style.imageUrl} 
                      alt={style.title || `スタイル ${style.id}`}
                      onError={handleImageError}
                      loading="lazy"
                      className="style-image"
                    />
                  </div>
                  
                  {/* スタイル情報 */}
                  <div className="style-info">
                    {style.title && (
                      <h3 className="style-title">{style.title}</h3>
                    )}
                    <div className="style-date">
                      {new Date(style.publishedAt)
                        .toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\//g, '.')}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* もっと見るボタン */}
      <div className="tnf-more-btn">
        <a 
          href={`/styling/?shop=${storeId}`} 
          className="tnf-default-btn"
          onClick={() => {
            // アナリティクスイベント送信（本番実装時に追加）
            console.log('View more styles clicked');
          }}
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

export default StaffStyle;