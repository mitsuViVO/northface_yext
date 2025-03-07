# THE NORTH FACE店舗ページ実装計画書 - Part 6: Gitプッシュとデプロイ手順

## 1. 実装計画文書のGitHubへのプッシュ手順

このセクションでは、作成した実装計画書をGitHubリポジトリにプッシュするための具体的な手順を説明します。

### 1.1 前提条件

- Gitがローカル環境にインストールされていること
- GitHubアカウントとリポジトリへのアクセス権があること
- ローカル環境のGitがリモートリポジトリと連携済みであること

### 1.2 作業用ブランチの作成

まず、新しい機能ブランチを作成します。ブランチ名には現在時刻を含めて重複を避けます。

```bash
# 現在の時刻を含むブランチ名を作成
# 例: feature-tnf-store-20250307095620
$branchName = "feature-tnf-store-" + (Get-Date -Format "yyyyMMddHHmmss")

# 新しいブランチを作成して切り替え
git checkout -b $branchName
```

### 1.3 変更内容の確認

追加した文書をGitで追跡するために、現在の変更状態を確認します。

```bash
# 変更状態の確認
git status
```

以下のような出力が表示されるはずです：

```
On branch feature-tnf-store-20250307095620
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        docs/TNF店舗ページ実装計画_1_概要.md
        docs/TNF店舗ページ実装計画_2_データモデル.md
        docs/TNF店舗ページ実装計画_3_コンポーネント.md
        docs/TNF店舗ページ実装計画_4_スタイル.md
        docs/TNF店舗ページ実装計画_5_実装計画.md
        docs/TNF店舗ページ実装計画_6_実装手順.md

nothing added to commit but untracked files present (use "git add" to track)
```

### 1.4 ファイルのステージング

作成したすべての実装計画ドキュメントを追加します。

```bash
# 特定のファイルを追加
git add docs/TNF店舗ページ実装計画_*.md

# 追加されたファイルを確認
git status
```

### 1.5 変更のコミット

意味のあるコミットメッセージとともに変更をコミットします。

```bash
# 変更をコミット
git commit -m "THE NORTH FACE店舗ページの詳細実装計画書を追加"
```

### 1.6 リモートリポジトリへのプッシュ

作成したブランチをリモートリポジトリにプッシュします。

```bash
# リモートブランチにプッシュ
git push -u origin $branchName
```

### 1.7 プルリクエストの作成

GitHubのWebインターフェースでプルリクエストを作成します。コマンドラインからGitHub CLIを使用する場合：

```bash
# GitHub CLI (gh)が必要です
gh pr create --title "THE NORTH FACE店舗ページの実装計画" --body "
# THE NORTH FACE店舗ページ実装計画

Yextプラットフォーム上でTHE NORTH FACE店舗ページを構築するための詳細実装計画です。

## 含まれるドキュメント
- 概要とUI分析
- データモデルと連携設計
- コア機能コンポーネント設計
- CSSスタイルシート設計
- 実装ステップと計画
- デプロイ手順

レビューお願いします。
"
```

## 2. Yext Pagesへのデプロイフロー

### 2.1 Yext Pages CLIのセットアップ

Yext Pagesにデプロイするために、Yext Pages CLIを使用します。

```bash
# Yext Pages CLIがインストールされていない場合はインストール
npm install -g @yext/pages-cli

# Yextアカウントへの認証
yext auth

# プロジェクト初期化（既存プロジェクトの場合は不要）
# yext pages init
```

### 2.2 ローカル開発環境での確認

実際の実装を始める前に、ローカル環境で動作確認をします。

```bash
# ローカル開発サーバーの起動
yext pages dev
```

ブラウザが自動的に開き、`http://localhost:5173/`でローカルサーバーが起動します。

### 2.3 ステージング環境へのデプロイ

開発が進んだら、ステージング環境にデプロイしてテストします。

```bash
# ステージング環境へのデプロイ
yext pages build
yext pages deploy -e staging
```

デプロイが完了すると、ステージング環境のURLが表示されます。例：`https://[サイト名]-[一意のID].edges.yextstaging.com/`

### 2.4 本番環境へのデプロイ

テストが完了し、本番環境にデプロイする準備ができたら、以下のコマンドを実行します。

```bash
# 本番環境へのビルド
yext pages build

# 本番環境へのデプロイ
yext pages deploy -e production
```

デプロイが完了すると、本番環境のURLが表示されます。例：`https://[サイト名].yextpages.com/`

## 3. CI/CDパイプラインの構築（オプション）

より効率的な開発フローのために、CI/CDパイプラインを構築することを推奨します。

### 3.1 GitHub Actionsの設定

`.github/workflows/yext-pages-deploy.yml`ファイルを作成します：

```yaml
name: Yext Pages Deployment

on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main, staging ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Staging
      if: github.ref == 'refs/heads/staging'
      run: |
        npm install -g @yext/pages-cli
        echo "${{ secrets.YEXT_API_KEY }}" | yext auth
        yext pages deploy -e staging
    
    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      run: |
        npm install -g @yext/pages-cli
        echo "${{ secrets.YEXT_API_KEY }}" | yext auth
        yext pages deploy -e production
```

### 3.2 シークレットの設定

GitHubリポジトリの設定で、以下のシークレットを追加します：

- `YEXT_API_KEY`: Yext APIキー

## 4. デプロイ後の確認チェックリスト

デプロイ後に確認すべき重要な項目をリストアップします。

### 4.1 機能確認

- [ ] 店舗情報が正しく表示されているか
- [ ] Google Mapが正しく表示され、マーカーが機能しているか
- [ ] STAFF STYLEのコンテンツが表示されているか
- [ ] SHOP BLOGのコンテンツが表示されているか
- [ ] 「もっと見る」リンクが正しいURLに遷移するか
- [ ] SNSリンクが正しく機能しているか

### 4.2 レスポンシブ確認

- [ ] デスクトップ表示（1300px以上）
- [ ] タブレット表示（768px〜1299px）
- [ ] モバイル表示（767px以下）
- [ ] 各要素のレイアウト崩れがないか

### 4.3 パフォーマンス確認

- [ ] Google PageSpeed Insightsスコア
- [ ] Webバイタル（LCP, FID, CLS）
- [ ] 画像の読み込み速度
- [ ] APIレスポンスのタイミング

### 4.4 アクセシビリティ確認

- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応
- [ ] カラーコントラスト
- [ ] alt属性の適切な設定

## 5. トラブルシューティングガイド

よくある問題とその解決策を示します。

### 5.1 デプロイエラー

**問題**: デプロイコマンドが失敗する

**解決策**:
1. Yext CLIの認証状態を確認: `yext auth status`
2. APIキーが有効か確認
3. ビルドエラーがないか確認: `yext pages build --verbose`

### 5.2 画像表示の問題

**問題**: 画像が表示されない

**解決策**:
1. パスが正しいか確認
2. 画像ファイルが存在するか確認
3. Yextプラットフォームでのアセット設定を確認
4. CDNキャッシュをクリアする

### 5.3 API連携の問題

**問題**: Staff Start APIからデータが取得できない

**解決策**:
1. APIエンドポイントのURLを確認
2. 認証情報を確認
3. ネットワークタブでAPIレスポンスを確認
4. CORSエラーがあれば適切なプロキシを設定

### 5.4 レスポンシブデザインの問題

**問題**: 特定のブレイクポイントでレイアウトが崩れる

**解決策**:
1. ブラウザの開発者ツールでエレメントを検査
2. メディアクエリの設定を確認
3. Flexbox/Gridの使用方法を確認
4. ビューポート設定を確認

## 6. 最後に

これでTHE NORTH FACE店舗ページの実装計画ドキュメントのGitHubへのプッシュ手順と、実際のデプロイフローが完成しました。このドキュメントに従って実装を進めることで、元サイトを忠実に再現した高品質な店舗ページを構築できます。

開発中に疑問点や問題が発生した場合は、このドキュメントを参照するか、チームメンバーに相談してください。