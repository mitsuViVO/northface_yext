/**
 * THE NORTH FACE店舗のモックデータ
 * 実際の開発では、Yext Knowledge Graph APIからデータを取得します
 */

export interface StoreLocation {
  id: string;
  name: string;
  c_shopType: 'directly' | 'outlet';
  address: {
    postalCode: string;
    region: string; // 都道府県
    city: string; // 市区町村
    line1: string; // 番地等
    line2?: string; // 建物名等
  };
  mainPhone: string;
  yextDisplayCoordinate: {
    latitude: number;
    longitude: number;
  };
  c_activities?: Array<{
    id: string;
    name: string;
    iconUrl: string;
  }>;
  c_gender?: Array<{
    id: string;
    name: string;
  }>;
  c_services?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  c_galleryPhotos?: Array<{
    url: string;
    description?: string;
  }>;
  c_blogUrl?: string;
  c_instagramUrl?: string;
  c_twitterUrl?: string;
  c_facebookUrl?: string;
  c_youtubeUrl?: string;
  c_storeId?: string;
}

export const mockStoreData: StoreLocation = {
  id: "406180",
  name: "THE NORTH FACE 仙台泉営業所",
  c_shopType: "directly",
  address: {
    postalCode: "981-3133",
    region: "宮城県",
    city: "仙台市泉区",
    line1: "泉中央1-4-1",
    line2: "セルバテラス2F"
  },
  mainPhone: "022-341-1940",
  yextDisplayCoordinate: {
    latitude: 38.321124,
    longitude: 140.879279
  },
  c_activities: [
    { id: "act003", name: "トレッキング", iconUrl: "/images/activities/trekking.svg" },
    { id: "act004", name: "ランニング", iconUrl: "/images/activities/running.svg" },
    { id: "act001", name: "キャンプ", iconUrl: "/images/activities/camping.svg" }
  ],
  c_gender: [
    { id: "1", name: "メンズ" },
    { id: "2", name: "ウィメンズ" },
    { id: "4", name: "キッズ" }
  ],
  c_services: [
    { id: "service01", name: "修理受付", icon: "repair" },
    { id: "service02", name: "ギフトラッピング", icon: "gift" },
    { id: "service03", name: "ポイントカード", icon: "point" }
  ],
  c_galleryPhotos: [
    { url: "/images/stores/sendai_izumi_1.jpg", description: "店舗外観" },
    { url: "/images/stores/sendai_izumi_2.jpg", description: "店内の様子" }
  ],
  c_blogUrl: "https://www.goldwin.co.jp/tnf/blog/?shop=406180",
  c_instagramUrl: "https://www.instagram.com/thenorthfacejp/",
  c_twitterUrl: "https://twitter.com/thenorthfacejp",
  c_storeId: "406180"
};