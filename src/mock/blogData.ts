/**
 * ショップブログのモックデータ
 * 実際の開発では、Staff Start APIからデータを取得します
 */

export interface BlogPost {
  article_id: string; // 記事ID（Staff Start API用）
  title: string;
  first_published_at: string;
  resized_main_images: {
    m: string; // 中サイズ画像URL
  };
  image_url?: string; // 代替画像URL
}

export const mockBlogPosts: BlogPost[] = [
  {
    article_id: "blog1",
    title: "春の新作アイテム入荷しました！",
    first_published_at: "2025-02-20T10:30:00",
    resized_main_images: {
      m: "https://goldwin.scene7.com/is/image/goldwin/TNF_blog_01?$blog_thumb$"
    }
  },
  {
    article_id: "blog2",
    title: "おすすめトレッキングコース特集",
    first_published_at: "2025-02-15T15:45:00",
    resized_main_images: {
      m: "https://goldwin.scene7.com/is/image/goldwin/TNF_blog_02?$blog_thumb$"
    }
  },
  {
    article_id: "blog3",
    title: "スタッフおすすめキャンプギア",
    first_published_at: "2025-02-10T09:20:00",
    resized_main_images: {
      m: "https://goldwin.scene7.com/is/image/goldwin/TNF_blog_03?$blog_thumb$"
    }
  }
];

/**
 * ブログ記事データ取得関数のモック
 * @param shopCode 店舗コード
 * @param count 取得件数
 * @returns ブログ記事データ配列
 */
export const fetchBlogPosts = async (shopCode: string, count: number = 3): Promise<BlogPost[]> => {
  console.log(`Mock fetchBlogPosts called with shopCode: ${shopCode}, count: ${count}`);
  
  // 実際のAPIリクエストをシミュレート（遅延を設定）
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBlogPosts.slice(0, count));
    }, 500);
  });
};