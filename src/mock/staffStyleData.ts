/**
 * スタッフスタイルのモックデータ
 * 実際の開発では、Staff Start APIからデータを取得します
 */

export interface StaffStyle {
  id: string;
  cid: string; // コーディネートID（Staff Start API用）
  imageUrl: string;
  title?: string;
  publishedAt: string;
  url?: string;
}

export const mockStaffStyles: StaffStyle[] = [
  {
    id: "style1",
    cid: "style1",
    imageUrl: "https://goldwin.scene7.com/is/image/goldwin/TNF22SS-120001-1?$product_main$",
    title: "春のトレッキングスタイル",
    publishedAt: "2025-02-15T12:00:00",
    url: "/styling/i/?cid=style1&aid3=shopdetail_coordinate_406180"
  },
  {
    id: "style2",
    cid: "style2",
    imageUrl: "https://goldwin.scene7.com/is/image/goldwin/TNF22SS-120016-1?$product_main$",
    title: "アウトドアジャケットコーデ",
    publishedAt: "2025-02-10T15:30:00",
    url: "/styling/i/?cid=style2&aid3=shopdetail_coordinate_406180"
  },
  {
    id: "style3",
    cid: "style3",
    imageUrl: "https://goldwin.scene7.com/is/image/goldwin/TNF22SS-120019-1?$product_main$",
    title: "日常使いのカジュアルコーデ",
    publishedAt: "2025-02-05T09:15:00",
    url: "/styling/i/?cid=style3&aid3=shopdetail_coordinate_406180"
  }
];

/**
 * スタイリングデータ取得関数のモック
 * @param shopCode 店舗コード
 * @param count 取得件数
 * @returns スタイリングデータ配列
 */
export const fetchStaffStyles = async (shopCode: string, count: number = 3): Promise<StaffStyle[]> => {
  console.log(`Mock fetchStaffStyles called with shopCode: ${shopCode}, count: ${count}`);
  
  // 実際のAPIリクエストをシミュレート（遅延を設定）
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStaffStyles.slice(0, count));
    }, 500);
  });
};