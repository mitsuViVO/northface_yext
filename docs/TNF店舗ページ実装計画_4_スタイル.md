# THE NORTH FACE店舗ページ実装計画書 - Part 4: CSSスタイルシート設計

## 1. スタイリング戦略

THE NORTH FACE店舗ページのスタイリングでは、元サイトの外観や体験を正確に再現するために、詳細なCSSを実装します。

スタイリング全体のアプローチ：
- 変数（CSS変数）を使用した一貫したデザイン
- コンポーネントスコープのスタイリング
- ブレイクポイントに応じたレスポンシブデザイン
- アニメーションとトランジションを用いた滑らかな体験の実現
- アクセシビリティに配慮したコントラストと視覚的フィードバック

## 2. グローバルスタイル

アプリケーション全体で使用する基本スタイルを定義します。

### 2.1 変数定義

```css
/* global.css */
:root {
  /* カラー変数 */
  --tnf-black: #000000;
  --tnf-white: #FFFFFF;
  
  /* グレースケール */
  --tnf-gray-100: #F8F9FA;
  --tnf-gray-200: #E9ECEF;
  --tnf-gray-300: #DEE2E6;
  --tnf-gray-400: #CED4DA;
  --tnf-gray-500: #ADB5BD;
  --tnf-gray-600: #6C757D;
  --tnf-gray-700: #495057;
  --tnf-gray-800: #343A40;
  --tnf-gray-900: #212529;
  
  /* フォント */
  --tnf-font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", 'Yu Gothic', "メイリオ", "Meiryo", "Avenir Next", "Avenir", Helvetica, Arial, sans-serif;
  --tnf-font-size-xs: 10px;
  --tnf-font-size-sm: 12px;
  --tnf-font-size-md: 14px;
  --tnf-font-size-lg: 16px;
  --tnf-font-size-xl: 18px;
  --tnf-font-size-2xl: 24px;
  --tnf-font-size-3xl: 28px;
  
  /* スペーシング */
  --tnf-spacing-xs: 5px;
  --tnf-spacing-sm: 10px;
  --tnf-spacing-md: 15px;
  --tnf-spacing-lg: 20px;
  --tnf-spacing-xl: 30px;
  --tnf-spacing-2xl: 40px;
  --tnf-spacing-3xl: 60px;
  
  /* トランジション */
  --tnf-transition-fast: 0.2s ease;
  --tnf-transition-normal: 0.3s ease;
  --tnf-transition-slow: 0.5s ease;
  
  /* シャドウ */
  --tnf-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --tnf-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --tnf-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* ブレークポイント */
  --tnf-breakpoint-sm: 767px;
  --tnf-breakpoint-md: 1024px;
  --tnf-breakpoint-lg: 1300px;
}

/* リセットと基本スタイル */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--tnf-font-family);
  font-size: var(--tnf-font-size-md);
  line-height: 1.5;
  color: var(--tnf-black);
  background-color: var(--tnf-white);
}

a {
  color: var(--tnf-black);
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* 共通レイアウト */
.wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 15px;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 共通コンポーネント */
.section-title {
  font-size: var(--tnf-font-size-3xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background-color: var(--tnf-black);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.more_btn {
  text-align: center;
  margin: 30px 0;
}

.default-btn {
  display: inline-block;
  padding: 12px 40px;
  border: 1px solid var(--tnf-black);
  font-size: var(--tnf-font-size-md);
  font-weight: bold;
  text-decoration: none;
  color: var(--tnf-black);
  background-color: var(--tnf-white);
  transition: all var(--tnf-transition-normal);
}

.default-btn:hover {
  background-color: var(--tnf-black);
  color: var(--tnf-white);
}

/* アニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* レスポンシブ */
@media (max-width: 1024px) {
  .wrapper {
    max-width: 100%;
  }
  
  .section-title {
    font-size: var(--tnf-font-size-2xl);
  }
}

@media (max-width: 767px) {
  body {
    font-size: var(--tnf-font-size-sm);
  }
  
  .section-title {
    font-size: var(--tnf-font-size-xl);
  }
  
  .default-btn {
    padding: 10px 30px;
  }
}
```

## 3. コンポーネント別スタイル

### 3.1 StoreHero.css

```css
/* StoreHero.css */

/* 店舗詳細メインコンテナ */
.shop_detail {
  margin: 30px 0 50px;
  font-family: var(--tnf-font-family);
}

/* 店舗タイトル */
.page-title {
  font-size: var(--tnf-font-size-3xl);
  font-weight: bold;
  margin: 0 0 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--tnf-gray-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.3;
  letter-spacing: 0.03em;
}

/* 店舗名 */
#shop_name {
  margin-right: 15px;
}

/* 店舗タイプラベル */
#service {
  display: inline-block;
  font-size: var(--tnf-font-size-md);
  padding: 3px 8px;
  border: 1px solid var(--tnf-black);
  font-weight: normal;
  line-height: 1;
}

/* 店舗情報の全体レイアウト */
.shop_detail_overview {
  display: flex;
  margin-bottom: 50px;
}

/* Google Mapコンテナ */
#shopMap {
  width: 50%;
  height: 400px;
  border: 1px solid var(--tnf-gray-300);
  margin-right: 30px;
}

/* 情報パネル */
.shop_detail_info {
  width: 50%;
}

/* 定義リスト共通スタイル */
.shop_detail_info dl {
  margin: 0 0 20px;
  padding: 0;
}

.shop_detail_info dt {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: var(--tnf-font-size-lg);
}

.shop_detail_info dd {
  margin: 0;
  padding: 0;
}

/* 住所スタイル */
.shop_detail_address {
  margin-bottom: 20px;
}

#shopAddress {
  font-size: var(--tnf-font-size-md);
  line-height: 1.6;
}

/* 電話番号スタイル */
.shop_detail_tel {
  margin-bottom: 20px;
}

#shopTel a {
  color: var(--tnf-black);
  text-decoration: none;
  font-size: var(--tnf-font-size-md);
}

#shopTel a:hover {
  text-decoration: underline;
}

/* アクティビティリスト */
.shop_activity {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.shop_activity li {
  display: flex;
  align-items: center;
  margin: 0 20px 12px 0;
  transition: transform var(--tnf-transition-fast);
}

.shop_activity li:hover {
  transform: scale(1.05);
}

.activity_image {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity_image img {
  max-width: 100%;
  max-height: 100%;
}

/* 取扱タイプ */
.shop_gender {
  font-size: var(--tnf-font-size-md);
}

.shop_gender span:not(:last-child)::after {
  content: '、';
}

/* ショップSNS */
.shop_sns ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.shop_sns li {
  margin: 0 15px 10px 0;
}

.shop_sns a {
  display: inline-block;
  text-decoration: none;
  color: var(--tnf-black);
  font-weight: bold;
  font-size: var(--tnf-font-size-md);
  position: relative;
  padding-left: 22px;
  transition: opacity var(--tnf-transition-fast);
}

.shop_sns a:hover {
  opacity: 0.7;
}

.shop_sns a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* レスポンシブ対応 */
@media (max-width: 1024px) {
  .shop_detail_overview {
    flex-direction: column;
  }
  
  #shopMap {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
    height: 350px;
  }
  
  .shop_detail_info {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .page-title {
    font-size: var(--tnf-font-size-2xl);
    flex-direction: column;
    align-items: flex-start;
  }
  
  #shop_name {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  #shopMap {
    height: 250px;
  }
  
  .shop_activity {
    flex-direction: column;
  }
  
  .shop_activity li {
    margin-right: 0;
  }
  
  .shop_sns ul {
    flex-direction: column;
  }
  
  .shop_sns li {
    margin-right: 0;
  }
}
```

### 3.2 StaffStyle.css

```css
/* StaffStyle.css */

/* メインコンテナ */
.store_style {
  margin: 60px 0;
  padding: 0;
  position: relative;
  font-family: var(--tnf-font-family);
}

/* セクションタイトル */
.store_style .section-title {
  font-size: var(--tnf-font-size-3xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  letter-spacing: 0.05em;
  color: var(--tnf-black);
}

.store_style .section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background-color: var(--tnf-black);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* コンテンツエリア */
.store_style .section_detail {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

/* スタイリングリスト */
.store_style .goods_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* スタイリングアイテム */
.store_style .goods_item {
  background: var(--tnf-white);
  overflow: hidden;
  box-shadow: var(--tnf-shadow-sm);
  transition: all var(--tnf-transition-normal);
  position: relative;
}

/* ホバーエフェクト */
.store_style .goods_item:hover {
  transform: translateY(-5px);
  box-shadow: var(--tnf-shadow-md);
}

/* フェードインアニメーション */
.store_style .fade-in-item {
  opacity: 0;
  animation: fadeIn var(--tnf-transition-slow) ease forwards;
}

.store_style .goods_item:nth-child(1) { animation-delay: 0.1s; }
.store_style .goods_item:nth-child(2) { animation-delay: 0.2s; }
.store_style .goods_item:nth-child(3) { animation-delay: 0.3s; }

/* 商品リンク */
.store_style .goods_link {
  display: block;
  text-decoration: none;
  color: var(--tnf-black);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 画像コンテナ */
.store_style .goods_image {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1アスペクト比 */
  overflow: hidden;
}

/* 商品画像 */
.store_style .goods_image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--tnf-transition-slow);
}

/* 画像ホバーエフェクト */
.store_style .goods_link:hover .goods_image img {
  transform: scale(1.05);
}

/* 商品情報 */
.store_style .goods_info {
  padding: 12px;
  background: var(--tnf-white);
}

/* 商品タイトル */
.store_style .goods_title {
  margin: 0 0 6px;
  font-size: var(--tnf-font-size-md);
  font-weight: bold;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 日付 */
.store_style .goods_date {
  font-size: var(--tnf-font-size-sm);
  color: var(--tnf-gray-600);
}

/* もっと見るボタン */
.store_style .more_btn {
  text-align: center;
  margin: 30px 0 10px;
}

.store_style .default-btn {
  display: inline-block;
  padding: 12px 40px;
  border: 1px solid var(--tnf-black);
  font-size: var(--tnf-font-size-md);
  font-weight: bold;
  text-decoration: none;
  color: var(--tnf-black);
  background-color: var(--tnf-white);
  transition: all var(--tnf-transition-normal);
  letter-spacing: 0.05em;
}

.store_style .default-btn:hover {
  background-color: var(--tnf-black);
  color: var(--tnf-white);
}

/* ローディングインジケーター */
.store_style .loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.store_style .spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--tnf-black);
  animation: spin 1s linear infinite;
}

/* メディアクエリ - タブレット */
@media (max-width: 1024px) {
  .store_style .goods_list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .store_style .section-title {
    font-size: var(--tnf-font-size-2xl);
  }
}

/* メディアクエリ - スマホ */
@media (max-width: 767px) {
  .store_style {
    margin: 40px 0;
  }
  
  .store_style .section_detail {
    padding: 0 15px;
  }
  
  .store_style .goods_list {
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }
  
  .store_style .section-title {
    font-size: var(--tnf-font-size-xl);
  }
  
  .store_style .default-btn {
    padding: 10px 30px;
  }
}
```

### 3.3 ShopBlog.css

```css
/* ShopBlog.css */

/* メインコンテナ */
.store_blog {
  margin: 60px 0;
  padding: 0;
  position: relative;
  font-family: var(--tnf-font-family);
}

/* セクションタイトル */
.store_blog .section-title {
  font-size: var(--tnf-font-size-3xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  letter-spacing: 0.05em;
  color: var(--tnf-black);
}

.store_blog .section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background-color: var(--tnf-black);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* コンテンツエリア */
.store_blog .section_detail {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ブログリスト */
.store_blog ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ブログアイテム */
.store_blog li {
  background: var(--tnf-white);
  box-shadow: var(--tnf-shadow-sm);
  transition: all var(--tnf-transition-normal);
  animation: fadeIn var(--tnf-transition-slow) ease forwards;
  opacity: 0;
}

.store_blog li:nth-child(1) { animation-delay: 0.1s; }
.store_blog li:nth-child(2) { animation-delay: 0.2s; }
.store_blog li:nth-child(3) { animation-delay: 0.3s; }

/* ホバーエフェクト */
.store_blog li:hover {
  transform: translateY(-5px);
  box-shadow: var(--tnf-shadow-md);
}

/* ブログリンク */
.store_blog a {
  display: block;
  text-decoration: none;
  color: var(--tnf-black);
  overflow: hidden;
}

/* サムネイル画像 */
.store_blog_photo {
  display: block;
  position: relative;
  overflow: hidden;
  padding-top: 66.67%; /* 2:3アスペクト比 */
}

.store_blog_photo img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--tnf-transition-slow);
}

/* 画像ホバーエフェクト */
.store_blog a:hover .store_blog_photo img {
  transform: scale(1.05);
}

/* 日付 */
.store_blog_date {
  display: block;
  font-size: var(--tnf-font-size-sm);
  color: var(--tnf-gray-600);
  margin: 10px 12px 5px;
  letter-spacing: 0.03em;
}

/* タイトル */
.store_blog_title {
  display: block;
  font-weight: bold;
  margin: 0 12px 12px;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: var(--tnf-font-size-md);
}

/* もっと見るボタン */
.store_blog .more_btn {
  text-align: center;
  margin: 30px 0 10px;
}

.store_blog .default-btn {
  display: inline-block;
  padding: 12px 40px;
  border: 1px solid var(--tnf-black);
  font-size: var(--tnf-font-size-md);
  font-weight: bold;
  text-decoration: none;
  color: var(--tnf-black);
  background-color: var(--tnf-white);
  transition: all var(--tnf-transition-normal);
  letter-spacing: 0.05em;
}

.store_blog .default-btn:hover {
  background-color: var(--tnf-black);
  color: var(--tnf-white);
}

/* ローディングインジケーター */
.store_blog .loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.store_blog .spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--tnf-black);
  animation: spin 1s linear infinite;
}

/* メディアクエリ - タブレット */
@media (max-width: 1024px) {
  .store_blog ul {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .store_blog .section-title {
    font-size: var(--tnf-font-size-2xl);
  }
}

/* メディアクエリ - スマホ */
@media (max-width: 767px) {
  .store_blog {
    margin: 40px 0;
  }
  
  .store_blog .section_detail {
    padding: 0 15px;
  }
  
  .store_blog ul {
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }
  
  .store_blog .section-title {
    font-size: var(--tnf-font-size-xl);
  }
  
  .store_blog .default-btn {
    padding: 10px 30px;
  }
  
  .store_blog_title {
    height: auto;
    -webkit-line-clamp: 3;
  }
}
```

### 3.4 StoreGallery.css

```css
/* StoreGallery.css */

/* メインコンテナ */
.store_gallery {
  margin: 60px 0;
  padding: 0;
  position: relative;
}

/* セクションタイトル */
.store_gallery .section-title {
  font-size: var(--tnf-font-size-3xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  letter-spacing: 0.05em;
}

.store_gallery .section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background-color: var(--tnf-black);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* コンテンツエリア */
.store_gallery .section_detail {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* ギャラリー画像 */
.store_gallery img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border: 1px solid var(--tnf-gray-200);
  transition: transform var(--tnf-transition-fast);
}

.store_gallery img:hover {
  transform: scale(1.02);
}

/* メディアクエリ - タブレット以下 */
@media (max-width: 1024px) {
  .store_gallery .section-title {
    font-size: var(--tnf-font-size-2xl);
  }
}

/* メディアクエリ - スマホ */
@media (max-width: 767px) {
  .store_gallery {
    margin: 40px 0;
  }
  
  .store_gallery .section_detail {
    padding: 0 15px;
  }
  
  .store_gallery .section-title {
    font-size: var(--tnf-font-size-xl);
  }
}
```

## 4. ブラウザ互換性対応

主要なブラウザで一貫した表示を確保するための対策：

### 4.1 ベンダープレフィックス対応

```css
/* vendor-prefixes.css */

/* Flexbox */
.flex-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

/* Transforms */
.transform-element {
  -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  transform: translateY(-5px);
}

/* Transitions */
.transition-element {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

/* Animations */
@-webkit-keyframes fadeIn {
  from { opacity: 0; -webkit-transform: translateY(10px); transform: translateY(10px); }
  to { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; -webkit-transform: translateY(10px); transform: translateY(10px); }
  to { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }
}
```

### 4.2 Internet Explorer互換性対応

```css
/* ie-compatibility.css */

/* IE11対応のためのスタイル */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE11ではグリッドレイアウトが部分的にサポート */
  .store_style .goods_list,
  .store_blog ul {
    display: flex;
    flex-wrap: wrap;
  }
  
  .store_style .goods_item,
  .store_blog li {
    width: calc(33.33% - 20px);
    margin: 0 10px 20px;
  }
  
  /* IE11では一部のCSS変数が未サポート */
  .default-btn {
    border: 1px solid #000000;
    color: #000000;
    background-color: #FFFFFF;
  }
  
  .default-btn:hover {
    background-color: #000000;
    color: #FFFFFF;
  }
}

@media all and (-ms-high-contrast: none) and (max-width: 1024px), (-ms-high-contrast: active) and (max-width: 1024px) {
  .store_style .goods_item,
  .store_blog li {
    width: calc(50% - 20px);
  }
}

@media all and (-ms-high-contrast: none) and (max-width: 767px), (-ms-high-contrast: active) and (max-width: 767px) {
  .store_style .goods_item,
  .store_blog li {
    width: 100%;
    margin: 0 0 15px;
  }
}