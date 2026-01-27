# hugo-theme-issues

JIRAのissueをMarkdownに変換して表示するためのHugoテーマです。プロジェクト内のissueを階層的に整理し、視覚的に分かりやすく表示することに特化しています。

## 特徴

- **3階層のプロジェクト構造表示**：エピック、ストーリー、タスクを階層的に表示
- **Issue Type別アイコン表示**：Epic、Story、Task、Sub-task、Bug など各種issueを視覚的に区別
- **レスポンシブデザイン**：デスクトップ、タブレット、モバイルに対応
- **左右サイドバーレイアウト**：プロジェクトナビゲーション（左）とページメタデータ（右）を同時表示
- **GitHub風スタイリング**：メンション、コード要素など一般的なMarkdown要素をGitHub風に表示
- **シンプルなテンプレート構造**：カスタマイズが容易なGo Templateベース

## 動作環境

- **Hugo バージョン**: 0.146.0 以上
- **拡張版**: 不要（`extended = false`）

## インストール

1. Hugoサイトの `themes` ディレクトリに配置：

```bash
cd themes
git clone <repository-url> hugo-theme-issues
cd ..
```

2. `hugo.toml` でテーマを指定：

```toml
theme = "hugo-theme-issues"
```

## 使用方法

### サーバーの起動

開発環境でサーバーを起動：

```bash
# テーマ親ディレクトリで実行
hugo server -D

# または、Makefileを使用
make server
```

サーバーは `http://localhost:1313` でアクセス可能です。

### 本番用ビルド

```bash
hugo

# または、Makefileを使用
make build
```

### テーマ単体でのテスト

テーマディレクトリ内に含まれるサンプルコンテンツでテスト：

```bash
hugo server -D --source .
```

## ディレクトリ構造

```
hugo-theme-issues/
├── assets/
│   ├── css/
│   │   └── main.css              # メインスタイルシート
│   └── js/
│       └── main.js                # JavaScriptファイル
├── layouts/
│   ├── baseof.html                # ベーステンプレート（3カラムレイアウト）
│   ├── home.html                  # ホームページレイアウト
│   ├── page.html                  # 個別ページレイアウト
│   ├── section.html               # セクションリストページ
│   ├── taxonomy.html              # タクソノミーページ
│   ├── term.html                  # ターム（タグなど）ページ
│   └── _partials/                 # 再利用可能なテンプレート
│       ├── head.html              # HTMLヘッダ
│       ├── head/css.html          # CSS読み込み
│       ├── head/js.html           # JavaScript読み込み
│       ├── header.html            # サイトヘッダー
│       ├── footer.html            # サイトフッター
│       ├── menu.html              # ナビゲーションメニュー
│       ├── sidebar-left.html      # 左サイドバー（プロジェクトナビ）
│       ├── sidebar-right.html     # 右サイドバー
├── content/                       # サンプルコンテンツ
├── archetypes/                    # 新規コンテンツテンプレート
├── i18n/                          # 国際化ファイル
├── data/                          # データファイル
├── static/                        # 静的ファイル
└── hugo.toml                      # Hugo設定ファイル
```

## デザイン・レイアウト

### 3カラムグリッドレイアウト

```
┌─────────────────────────────────────────────────────────┐
│                        HEADER                            │
├─────────────────┬──────────────────────┬─────────────────┤
│ Sidebar-Left    │                      │ Sidebar-Right   │
│ (250px)         │     MAIN CONTENT     │ (300px)         │
│ プロジェクト    │    (flexible width)  │ ページメタデータ │
│ ナビゲーション  │                      │                 │
├─────────────────┴──────────────────────┴─────────────────┤
│                       FOOTER                             │
└─────────────────────────────────────────────────────────┘
```

### レスポンシブブレークポイント

| ブレークポイント | レイアウト変更 |
|---|---|
| 1024px 以下 | 2カラム（左サイドバー＋メイン、右サイドバーは下部へ） |
| 768px 以下 | 1カラム（全要素がスタック） |

## CSS変数

`assets/css/main.css` で定義されている主なCSS変数：

```css
:root {
  --sidebar-left-width: 250px;      /* 左サイドバー幅 */
  --sidebar-right-width: 300px;     /* 右サイドバー幅 */
  --color-text: #222;               /* テキスト色 */
  --color-border: #ddd;             /* ボーダー色 */
  --color-border-dark: #222;        /* 濃いボーダー色 */
  --color-bg-light: #f9f9f9;        /* 薄い背景色 */
  --color-bg-th: #eee;              /* テーブルヘッダ背景色 */
  --color-link: #00e;               /* リンク色 */
}
```

## 実装済み機能

### 検索機能（Pagefind）

ヘッダーにPagefindを使った全文検索機能を搭載しています。

#### セットアップ手順

1. Hugoでサイトをビルド：

```bash
hugo
```

2. Pagefindでインデックスを作成：

```bash
npx pagefind --site public
```

3. サーバーを起動して確認：

```bash
hugo server
```

#### 使用方法

- ヘッダーの検索ボックスにキーワードを入力
- 矢印キー（↑↓）で検索結果を選択
- Enterキーで選択したページに移動
- Escキーで選択解除

**注意**: `hugo server -D` でドラフトを含めて開発する場合、Pagefindインデックスは`public`ディレクトリのビルド済みコンテンツのみを対象とするため、ドラフトページは検索対象外となります。

### 左サイドバー（プロジェクトナビゲーション）

- **3階層構造対応**：エピック → 子issue → 孫issue を階層的に表示
- **Issue Type別アイコン**：
  - 🟣 Epic
  - 📗 Story
  - ☑️ Task
  - ➡️ Sub-task
  - 🐞 Bug
  - 📄 その他
- **インデント機能**：子issue（1rem）と孫issue（2rem）を視覚的に区別
- **アクティブページハイライト**：現在のページを `.active` クラスで強調表示
- **親階層ナビゲーション**：⬆️ボタンでエピック単位に遡航
- **孤立issue管理**：どのエピックにも属さないissueを分離表示
- **レスポンシブ対応**：モバイル端末では非表示（768px以下）

### スタイリング

#### メンション要素 (`.mention` クラス)

GitHub風の青系スタイルでメンションを強調：

```markdown
@user や [#issue-number] などをメンション要素として表示
```

#### コード要素

- **インラインコード**：背景色とボーダーを付与
- **コードブロック**：背景色とスクロール機能を付与
- **シンタックスハイライト**：必要に応じてカスタマイズ可能

## カスタマイズ

### メニューの追加

`hugo.toml`でヘッダーのナビゲーションメニューを設定できます：

```toml
[menus]
  [[menus.main]]
    name = 'projects'
    pageRef = '/'
    weight = 10

  [[menus.main]]
    name = 'labels'
    pageRef = '/tags'
    weight = 30

  [[menus.main]]
    name = 'fix versions'
    pageRef = '/fix_versions'
    weight = 31
```

| パラメータ | 説明 |
|---|---|
| `name` | メニューに表示される名前 |
| `pageRef` | リンク先のパス |
| `weight` | 表示順序（小さいほど左に表示） |

**タクソノミーページへのリンク**：タクソノミー（tags, fix_versions等）のリストページにリンクする場合は、`hugo.toml`で対応するタクソノミーを定義する必要があります：

```toml
[taxonomies]
  tag = "tags"
  fix_version = "fix_versions"
  affected_version = "affected_versions"
```

### テンプレートのカスタマイズ

各テンプレートは以下の場所に配置されており、自由にカスタマイズ可能です：

- `layouts/baseof.html` - ベーステンプレート
- `layouts/_partials/*.html` - パーシャルテンプレート

### スタイルのカスタマイズ

`assets/css/main.css` でCSS変数を変更することで、デザインを一括変更できます：

```css
:root {
  --sidebar-left-width: 300px;  /* サイドバーの幅を変更 */
  --color-link: #0969da;        /* リンク色を変更 */
}
```

## 開発時の注意点

### Go Template構文

Hugoテンプレートは Go Template を使用しています：

```go
{{ .Content }}              // ページコンテンツ
{{ site.Title }}            // サイトタイトル
{{ .RelPermalink }}         // 相対URL
{{ partial "name.html" . }} // パーシャルの呼び出し
```

### フロントマター

コンテンツファイルのフロントマター形式（TOML）：

```toml
+++
title = 'ページタイトル'
date = 2023-01-15T09:00:00-07:00
draft = false
tags = ['tag1', 'tag2']
+++
```

## テスト

### ビジュアルテスト

変更後は以下の手順でビジュアルテストを実施してください：

1. `hugo server -D` でサーバーを起動
2. `http://localhost:1313` にアクセス
3. 各ブレークポイント（1024px、768px）でレスポンシブを確認
4. ブラウザのデベロッパーツールで表示を検証

詳細は [TESTING.md](./TESTING.md) を参照してください。

## トラブルシューティング

### サーバーが起動しない場合

Hugo のバージョンが 0.146.0 以上であることを確認：

```bash
hugo version
```

### スタイルが反映されない場合

キャッシュをクリアして再起動：

```bash
rm -rf resources/_gen
hugo server -D
```

## ライセンス

[ライセンスを記載]

## サポート・フィードバック

問題が発生した場合や改善提案は、GitHubのissuesセクションで報告してください。

## 関連リンク

- [Hugo公式ドキュメント](https://gohugo.io/)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/)
