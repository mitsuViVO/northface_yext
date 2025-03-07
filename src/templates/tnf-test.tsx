/**
 * THE NORTH FACE店舗ページのテスト表示用テンプレート
 * 開発環境でモックデータを使用してページをレンダリングします
 */

import { Template, GetPath, TemplateConfig, TemplateProps } from "@yext/pages";
import { Main } from "src/layouts/main";
import TNFStorePage from "src/components/store/TNFStorePage";

// 固定パスでアクセスできるようにする
export const getPath: GetPath<TemplateProps> = () => {
  return `tnf-store-test`;
};

// 空の設定（ストリームデータを使用しない）
export const config: TemplateConfig = {
  // スタティックページとしてビルド
  name: "tnf-store-test",
};

/**
 * THE NORTH FACE店舗ページのテスト用テンプレート
 */
const TNFTest: Template<TemplateProps> = (data) => {
  return (
    <Main data={data}>
      <TNFStorePage />
    </Main>
  );
};

export default TNFTest;