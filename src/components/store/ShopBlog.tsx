import React, { useState, useEffect } from 'react';
import { BlogPost, fetchBlogPosts } from '../../mock/blogData';
import '../../styles/tnfStoreStyles.css';
import './ShopBlog.css';

interface ShopBlogProps {
  storeId: string;
  initialPosts?: BlogPost[];
  displayCount?: number;
}

/**
 * ショップブログコンポーネント
 * 店舗ブログの最新記事を表示
 */
const ShopBlog: React.FC<ShopBlogProps> = ({ 
  storeId, 
  initialPosts, 
  displayCount = 3 
}) => {
  // ブログ記事state
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  // 読み込み状態state
  const [loading, setLoading] = useState<boolean>(!initialPosts);
  // エラー状態state
  const [error, setError] = useState<string | null>(null);
  
  // コンポーネントマウント時にデータ取得
  useEffect(() => {
    if (!initialPosts) {
      loadBlogPosts();
    }
  }, [storeId, initialPosts]);
  
  // ブログデータ取得関数
  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      // モックAPIからデータ取得
      const data = await fetchBlogPosts(storeId, displayCount);
      setPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
      setError('ブログデータの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // データがない場合は何も表示しない
  if (!loading && (posts.length === 0 || error)) {
    return null;
  }
  
  // 日付フォーマット関数
  const formatDate = (dateString: string): string => {
    return dateString.slice(0, 10).replace(/-/g, '.');
  };
  
  // 画像読み込みエラー時の処理
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/no-image.png';
  };
  
  return (
    <div className="store-blog">
      {/* セクションタイトル */}
      <h2 className="tnf-section-title">SHOP BLOG</h2>
      
      {/* メインコンテンツ */}
      <div className="tnf-container">
        {loading ? (
          // ローディング表示
          <div className="tnf-loading-spinner">
            <div className="tnf-spinner"></div>
          </div>
        ) : (
          // ブログカードグリッド
          <ul className="blog-grid">
            {posts.map((post, index) => (
              <li 
                key={post.article_id}
                className="blog-item"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  opacity: 0, 
                  animation: 'tnfFadeIn 0.6s ease forwards'
                }}
              >
                <a 
                  href={`/blog/i/?article_id=${post.article_id}&aid3=shopdetail_blog_${storeId}`}
                  className="blog-link"
                  onClick={() => {
                    // アナリティクスイベント送信（本番実装時に追加）
                    console.log(`Blog post clicked: ${post.article_id}`);
                  }}
                >
                  {/* サムネイル画像 */}
                  <div className="blog-image-container">
                    <img 
                      src={post.resized_main_images?.m || post.image_url} 
                      alt={post.title}
                      onError={handleImageError}
                      loading="lazy"
                      className="blog-image"
                    />
                  </div>
                  
                  {/* 投稿日 */}
                  <div className="blog-date">
                    {formatDate(post.first_published_at)}
                  </div>
                  
                  {/* タイトル */}
                  <h3 className="blog-title">
                    {post.title}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* もっと見るボタン */}
      <div className="tnf-more-btn">
        <a 
          href={`/blog/?shop=${storeId}`} 
          className="tnf-default-btn"
          onClick={() => {
            // アナリティクスイベント送信（本番実装時に追加）
            console.log('View more blogs clicked');
          }}
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

export default ShopBlog;