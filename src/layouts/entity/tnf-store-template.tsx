import React from 'react';
import { LocationProfile, TemplateRenderProps } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import { Main } from "src/layouts/main";
import StoreHero from "src/components/store/StoreHero";
import StoreGallery from "src/components/store/StoreGallery";
import StaffStyle from "src/components/store/StaffStyle";
import ShopBlog from "src/components/store/ShopBlog";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import { mockStoreData } from "src/mock/storeData";
import "src/styles/tnfStoreStyles.css";

interface TNFStoreLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

/**
 * THE NORTH FACE店舗ページのレイアウト
 * 現在はモックデータを使用していますが、実際の実装ではYext KGのデータを使用します
 */
const TNFStoreLayout = ({ data }: TNFStoreLayoutProps) => {
  // 実際の実装ではデータ.documentからプロパティを取得
  // const { id, name, address, mainPhone, yextDisplayCoordinate } = data.document;
  
  // モックデータを使用
  const store = mockStoreData;
  
  return (
    <>
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={[
            { name: "トップ", slug: "/" },
            { name: "店舗一覧", slug: "/locations" },
            { name: store.name, slug: "" }
          ]}
          separator="/"
          className="container"
        />
      </ErrorBoundaryWithAnalytics>
      
      <div className="tnf-store-page">
        <div className="tnf-container">
          {/* 店舗詳細情報（Googleマップ付き） */}
          <ErrorBoundaryWithAnalytics name="store-hero">
            <StoreHero 
              store={store} 
              googleMapsApiKey="YOUR_API_KEY" 
            />
          </ErrorBoundaryWithAnalytics>
          
          {/* 店舗ギャラリー */}
          {store.c_galleryPhotos && store.c_galleryPhotos.length > 0 && (
            <ErrorBoundaryWithAnalytics name="store-gallery">
              <StoreGallery photos={store.c_galleryPhotos} />
            </ErrorBoundaryWithAnalytics>
          )}
          
          {/* スタッフスタイル */}
          <LazyLoadWrapper>
            <ErrorBoundaryWithAnalytics name="staff-style">
              <StaffStyle 
                storeId={store.id}
                displayCount={3}
              />
            </ErrorBoundaryWithAnalytics>
          </LazyLoadWrapper>
          
          {/* ショップブログ */}
          <LazyLoadWrapper>
            <ErrorBoundaryWithAnalytics name="shop-blog">
              <ShopBlog 
                storeId={store.id}
                displayCount={3}
              />
            </ErrorBoundaryWithAnalytics>
          </LazyLoadWrapper>
        </div>
      </div>
    </>
  );
};

/**
 * THE NORTH FACE店舗詳細ページのテンプレート
 */
const TNFStoreTemplate = (data: TemplateRenderProps<LocationProfile>) => {
  return (
    <Main data={data}>
      <TNFStoreLayout data={data} />
    </Main>
  );
};

export default TNFStoreTemplate;