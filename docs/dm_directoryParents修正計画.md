# dm_directoryParents フィールド修正計画

## 背景

現在のビルドで「Failed binding the following fields to the schema: [dm_directoryParents]」というエラーが発生しています。このフィールドは現在のYextスキーマにバインドできないため、修正が必要です。

## 現状分析

`dm_directoryParents`フィールドは以下の場所で使用されています：

1. **レイアウトファイル**：
   - 各configBuilder.tsx（city, entity, region, root）
   - 各transformProps.tsx（city, entity, region, root）
   - entity/template.tsx
   - directory.tsx

2. **共通モジュール**：
   - head.tsx（メタデータ生成）
   - schema.tsx（スキーマ生成）

3. **型定義**：
   - entities.d.ts

主にページ間の階層関係を表すパンくずリスト（Breadcrumbs）の表示に使用されています。

## 修正アプローチの比較

### アプローチ1: フィールドの完全削除

#### 実装方法

1. 各configBuilder.tsxファイルから`dm_directoryParents`の参照を削除
   ```tsx
   // 例：src/layouts/city/configBuilder.tsx
   // 以下の行を削除
   "dm_directoryParents.slug",
   "dm_directoryParents.name",
   ```

2. 各transformProps.tsxファイルから関連コード削除
   ```tsx
   // 例：src/layouts/city/transformProps.tsx
   // 以下のコードを削除
   const { dm_directoryParents, name } = data.document;
   (dm_directoryParents || []).push({ name: name, slug: "" });
   
   // 以下のプロパティも削除
   dm_directoryParents: dm_directoryParents,
   ```

3. Breadcrumbsコンポーネントの引数修正
   ```tsx
   // 例：src/layouts/directory.tsx
   // 変更前
   <Breadcrumbs
     breadcrumbs={dm_directoryParents || []}
     separator="/"
   />
   
   // 変更後
   <Breadcrumbs
     breadcrumbs={[]}
     separator="/"
   />
   ```

4. 型定義から削除
   ```tsx
   // src/types/entities.d.ts
   // 以下の行を削除
   readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
   ```

#### メリット
- シンプルな実装：フィールド参照を完全に削除するだけ
- エラーが確実に解消される
- 余分なコードが削除され、コードベースがクリーンになる

#### デメリット
- パンくずリスト機能が失われる
- 階層を持つディレクトリ構造のナビゲーションが難しくなる
- メタデータやSEO関連機能が影響を受ける可能性

### アプローチ2: dm_directoryParents_defaultdirectory への移行

#### 実装方法

1. 各configBuilder.tsxファイルのフィールド参照変更
   ```tsx
   // 例：src/layouts/city/configBuilder.tsx
   // 変更前
   "dm_directoryParents.slug",
   "dm_directoryParents.name",
   
   // 変更後
   "dm_directoryParents_defaultdirectory.slug",
   "dm_directoryParents_defaultdirectory.name",
   ```

2. 各transformProps.tsxファイルの変数名を更新
   ```tsx
   // 例：src/layouts/city/transformProps.tsx
   // 変更前
   const { dm_directoryParents, name } = data.document;
   (dm_directoryParents || []).push({ name: name, slug: "" });
   
   // 返却オブジェクト内
   dm_directoryParents: dm_directoryParents,
   
   // 変更後
   const { dm_directoryParents_defaultdirectory, name } = data.document;
   (dm_directoryParents_defaultdirectory || []).push({ name: name, slug: "" });
   
   // 返却オブジェクト内
   dm_directoryParents_defaultdirectory: dm_directoryParents_defaultdirectory,
   ```

3. テンプレートとコンポーネントの参照更新
   ```tsx
   // 例：src/layouts/directory.tsx
   // 変更前
   const { dm_directoryParents, dm_directoryChildren } = data.document;
   <Breadcrumbs
     breadcrumbs={dm_directoryParents || []}
     separator="/"
   />
   
   // 変更後
   const { dm_directoryParents_defaultdirectory, dm_directoryChildren } = data.document;
   <Breadcrumbs
     breadcrumbs={dm_directoryParents_defaultdirectory || []}
     separator="/"
   />
   ```

4. 型定義の更新
   ```tsx
   // src/types/entities.d.ts
   // 変更前
   readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
   
   // 変更後
   readonly dm_directoryParents_defaultdirectory?: Array<{ slug: string; name: string }>;
   ```

#### メリット
- パンくずリスト機能を維持できる
- 既存のコードロジックをほぼそのまま流用できる
- メタデータやSEO機能への影響が少ない

#### デメリット
- 変更が多岐にわたり、修正漏れのリスクがある
- 新しいフィールド名が正しくYextスキーマに存在する保証がない
- プロジェクト全体でのフィールド名一貫性のメンテナンスが必要

## 推奨アプローチ

**アプローチ2: `dm_directoryParents_defaultdirectory` への移行**を推奨します。

理由：
1. パンくずリスト機能は閲覧性向上とSEOに重要
2. `dm_directoryParents_defaultdirectory`がドキュメント内で既に参照されている
3. フィールド名の移行は技術的な負担が比較的少ない

ただし、このアプローチを採用する前に以下を確認すべきです：
- Yextスキーマに`dm_directoryParents_defaultdirectory`フィールドが存在するか
- テスト環境でビルドが正常に完了するか

## 実装計画

1. 新しいブランチを作成: `fix-directory-parents-field`
2. src/typesの型定義を更新
3. 各configBuilder.tsxファイルの参照を更新
4. 各transformProps.tsxファイルのロジックを修正
5. テンプレートとコンポーネントの参照を更新
6. 共通モジュール（head.tsx, schema.tsx）の参照を修正
7. テストビルドの実行
8. プルリクエスト作成とマージ

## 代替案: ハイブリッドアプローチ

もし`dm_directoryParents_defaultdirectory`フィールドも利用できない場合は、以下のハイブリッドアプローチを検討します：

1. `dm_directoryParents`フィールドの参照を削除
2. ハードコードされたパンくずリストを実装
3. サイト構造に応じてカスタムロジックを開発