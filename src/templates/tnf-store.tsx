/**
 * THE NORTH FACE店舗ページテンプレート
 * Yext Knowledge Graphの店舗データを使用した店舗詳細ページ
 */

// エクスポート関数はデフォルトのentity.tsxから流用
export { getPath } from "src/layouts/entity/getPath";
export { transformProps } from "src/layouts/entity/transformProps";
export { getHeadConfig } from "src/layouts/entity/getHeadConfig";

import { Template } from "@yext/pages";
import TNFStoreTemplate from "src/layouts/entity/tnf-store-template";
import { configBuilder } from "src/layouts/entity/configBuilder";
import { LocationProfile, TemplateRenderProps } from "src/types/entities";

// THE NORTH FACE店舗用のストリーム設定
// デフォルトのconfigBuilderを使用（カスタマイズはYextの実装に合わせて調整）
export const config = configBuilder();

/**
 * THE NORTH FACE店舗ページテンプレート
 * このテンプレートは、Yext Knowledge Graphのデータを使用して店舗詳細ページを生成します
 */
const TNFStore: Template<TemplateRenderProps<LocationProfile>> = (data: TemplateRenderProps<LocationProfile>) => (
  <TNFStoreTemplate {...data} />
);

export default TNFStore;