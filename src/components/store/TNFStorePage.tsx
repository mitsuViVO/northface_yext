import React from 'react';
import StoreHero from './StoreHero';
import StaffStyle from './StaffStyle';
import ShopBlog from './ShopBlog';
import StoreGallery from './StoreGallery';
import { mockStoreData } from '../../mock/storeData';
import '../../styles/tnfStoreStyles.css';
import './TNFStorePage.css';

/**
 * THE NORTH FACE店舗ページ表示テスト用コンポーネント
 * 実際の実装ではYext KGのデータを使用します
 */
const TNFStorePage: React.FC = () => {
  // モックデータを使用
  const store = mockStoreData;
  
  return (
    <div className="tnf-store-page">
      <div className="tnf-breadcrumbs">
        <div className="tnf-container">
          <ul className="breadcrumbs-list">
            <li><a href="/">トップ</a></li>
            <li><span>/</span></li>
            <li><a href="/locations">店舗一覧</a></li>
            <li><span>/</span></li>
            <li><span>{store.name}</span></li>
          </ul>
        </div>
      </div>
      
      <div className="tnf-container">
        {/* 店舗詳細情報（Googleマップ付き） */}
        <StoreHero store={store} />
        
        {/* 店舗ギャラリー */}
        {store.c_galleryPhotos && store.c_galleryPhotos.length > 0 && (
          <StoreGallery photos={store.c_galleryPhotos} />
        )}
        
        {/* スタッフスタイル */}
        <StaffStyle 
          storeId={store.id}
          displayCount={3}
        />
        
        {/* ショップブログ */}
        <ShopBlog 
          storeId={store.id}
          displayCount={3}
        />
      </div>
    </div>
  );
};

export default TNFStorePage;