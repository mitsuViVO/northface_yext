/**
 * THE NORTH FACE店舗ページのテスト表示用テンプレート
 * 開発環境でモックデータを使用してページをレンダリングします
 */

import { Template, GetPath, TemplateConfig, TemplateProps } from "@yext/pages";
import { Main } from "src/layouts/main";
import TNFStorePage from "src/components/store/TNFStorePage";
import { TemplateRenderProps } from "src/types/entities";

// 固定パスでアクセスできるようにする
export const getPath: GetPath<TemplateProps> = () => {
  return `tnf-store-test`;
};

// 空の設定（ストリームデータを使用しない）
export const config: TemplateConfig = {
  // スタティックページとしてビルド
  name: "tnf-store-test",
};

// テスト用モックデータ
const getMockTemplateData = (): TemplateRenderProps<any> => {
  return {
    document: {
      _site: {
        c_copyrightMessage: "© 2025 THE NORTH FACE. All rights reserved.",
        c_header: {
          logo: {
            url: "https://northface.co.jp/assets/images/logo.png",
            width: 200,
            height: 60,
            alternateText: "THE NORTH FACE"
          },
          links: []
        },
        c_footerLinks: [],
      },
      locale: "ja",
      meta: { entityType: { id: "location" } },
      id: "test-store",
      name: "THE NORTH FACE テスト店舗",
    },
    __meta: {
      mode: "development"
    }
  } as TemplateRenderProps<any>;
};

/**
 * THE NORTH FACE店舗ページのテスト用テンプレート
 */
const TNFTest: Template<TemplateProps> = (data) => {
  // モックデータをマージして使用
  const mockData = getMockTemplateData();
  
  return (
    <Main data={mockData}>
      <TNFStorePage />
    </Main>
  );
};

export default TNFTest;