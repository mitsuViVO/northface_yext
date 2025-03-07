import React from 'react';
import '../../styles/tnfStoreStyles.css';
import './StoreGallery.css';

interface StoreGalleryProps {
  photos: Array<{
    url: string;
    description?: string;
  }>;
}

/**
 * 店舗ギャラリーコンポーネント
 * 店舗の画像ギャラリーを表示
 */
const StoreGallery: React.FC<StoreGalleryProps> = ({ photos = [] }) => {
  // 画像がない場合は何も表示しない
  if (photos.length === 0) return null;

  // 画像読み込みエラー時の処理
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/no-image.png';
  };

  return (
    <div className="store-gallery">
      <h2 className="tnf-section-title">STORE GALLERY</h2>
      <div className="tnf-container">
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={photo.url} 
                alt={photo.description || `店舗画像 ${index + 1}`}
                onError={handleImageError}
                loading="lazy"
                className="gallery-image"
              />
              {photo.description && (
                <div className="gallery-caption">{photo.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreGallery;