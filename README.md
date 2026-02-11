# hugo-theme-issues

JIRAのissueをMarkdownに変換して表示するためのHugoテーマです。プロジェクト内のissueを階層的に整理し、視覚的に分かりやすく表示することに特化しています。

## 特徴

- **3階層のプロジェクト構造表示**：エピック、ストーリー、タスクを階層的に表示
- **Issue Type別アイコン表示**：Epic、Story、Task、Sub-task、Bug など各種issueを視覚的に区別
- **レスポンシブデザイン**：デスクトップ、タブレット、モバイルに対応
- **左右サイドバーレイアウト**：プロジェクトナビゲーション（左）とページメタデータ（右）を同時表示
- **タクソノミー対応**：タグ、Fix Versions、Affected Versions 別のページを自動生成
- **全文検索**：Pagefind による高速な全文検索機能
- **GitHub風スタイリング**：メンション、コード要素など一般的なMarkdown要素をGitHub風に表示
- **高速ビルド**：partialCached + Scratch インデックスによる最適化で4,000ページ超を約2分でビルド

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

### Makefileコマンド

| コマンド | 説明 |
|---|---|
| `make server` | 開発サーバー起動（:1313） |
| `make build` | 本番ビルド |
| `make build-theme` | テーマ単体ビルド |
| `make clean` | キャッシュクリア |
| `make test` | ビルドテスト |
| `make lint` | Markdown チェック |
| `make serve-prod` | 本番モードサーバー |
| `make fresh` | クリーンビルド+サーバー起動 |
| `make help` | ヘルプ表示 |

## フロントマター

コンテンツファイルのフロントマター形式（TOML）：

```toml
+++
title = 'Issue Title'
date = 2024-01-15
draft = false

# Issue パラメータ
issue_key = 'PROJ-123'          # issue の一意識別子
issue_type = 'Story'            # Epic / Story / Task / Sub-task / Bug
status = 'In Progress'          # ステータス
assignee = 'user@example.com'   # 担当者

# 日付
startdate = '2024-01-15'        # 開始日
duedate = '2024-01-31'          # 終了日

# 階層構造
parent = 'PROJ-100'             # 親 issue の issue_key
rank = 1                        # ソート順序（昇順）

# タクソノミー
tags = ['tag1', 'tag2']
fix_versions = ['v1.0', 'v1.1']
affected_versions = ['v0.9']
+++
```

### パラメータ一覧

| パラメータ | 必須 | 説明 |
|---|---|---|
| `issue_key` | 推奨 | issue の一意識別子（例: `PROJ-123`） |
| `issue_type` | 推奨 | issue 種別。`Epic` / `Story` / `Task` / `Sub-task` / `Bug` |
| `status` | - | ステータス（セクションページのテーブルに表示） |
| `assignee` | - | 担当者 |
| `startdate` | - | 開始日 |
| `duedate` | - | 終了日 |
| `parent` | - | 親 issue の `issue_key`。これにより階層構造を形成 |
| `rank` | - | ソート順序（昇順、数値が小さいほど上に表示） |
| `tags` | - | タグ（タクソノミー） |
| `fix_versions` | - | 修正バージョン（タクソノミー） |
| `affected_versions` | - | 影響バージョン（タクソノミー） |

### 階層構造の例

```
PROJ-1 (Epic)          ← parent なし、issue_type = "Epic"
├── PROJ-10 (Story)    ← parent = "PROJ-1"
│   ├── PROJ-100 (Task)  ← parent = "PROJ-10"
│   └── PROJ-101 (Task)  ← parent = "PROJ-10"
└── PROJ-11 (Story)    ← parent = "PROJ-1"
```

## ディレクトリ構造

```
hugo-theme-issues/
├── assets/
│   ├── css/
│   │   └── main.css                # メインスタイルシート
│   └── js/
│       └── main.js                 # JavaScriptファイル
├── layouts/
│   ├── baseof.html                 # ベーステンプレート（3カラムレイアウト）
│   ├── home.html                   # ホームページレイアウト
│   ├── page.html                   # 個別ページレイアウト
│   ├── section.html                # セクションリストページ
│   ├── taxonomy.html               # タクソノミーページ
│   ├── term.html                   # ターム（タグなど）ページ
│   ├── _markup/
│   │   ├── render-image.html       # 画像レンダリングカスタマイズ
│   │   └── render-table.html.html  # テーブルレンダリングカスタマイズ
│   ├── _partials/
│   │   ├── head.html               # HTMLヘッダ
│   │   ├── head/css.html           # CSS読み込み
│   │   ├── head/js.html            # JavaScript読み込み
│   │   ├── header.html             # サイトヘッダー
│   │   ├── footer.html             # サイトフッター
│   │   ├── menu.html               # ナビゲーションメニュー
│   │   ├── sidebar-left.html       # 左サイドバー（プロジェクトナビ）
│   │   ├── sidebar-taxonomy.html   # タクソノミーサイドバー
│   │   └── _sidebar-right.html     # 右サイドバー
│   └── shortcodes/
│       └── comment.html            # コメント表示用ショートコード
├── content/                        # サンプルコンテンツ
├── archetypes/                     # 新規コンテンツテンプレート
├── i18n/                           # 国際化ファイル
├── data/                           # データファイル
├── static/                         # 静的ファイル
└── hugo.toml                       # Hugo設定ファイル
```

## デザイン・レイアウト

### 3カラムグリッドレイアウト

```
┌─────────────────────────────────────────────────────────┐
│                        HEADER                           │
├─────────────────┬──────────────────────┬────────────────┤
│ Sidebar-Left    │                      │ Sidebar-Right  │
│ (250px)         │     MAIN CONTENT     │ (300px)        │
│ プロジェクト    │    (flexible width)  │ ページメタデータ│
│ ナビゲーション  │                      │                │
├─────────────────┴──────────────────────┴────────────────┤
│                       FOOTER                            │
└─────────────────────────────────────────────────────────┘
```

### レスポンシブブレークポイント

| ブレークポイント | レイアウト変更 |
|---|---|
| 1024px 以下 | 2カラム（左サイドバー＋メイン、右サイドバーは下部へ） |
| 768px 以下 | 1カラム（全要素がスタック） |

## 実装済み機能

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

### タクソノミー

- **タグ（tags）**: issue にラベルを付与し、タグ別ページで一覧表示
- **Fix Versions（fix_versions）**: 修正バージョン別に issue を分類
- **Affected Versions（affected_versions）**: 影響バージョン別に issue を分類
- 左サイドバーにタグクラウドとバージョン一覧を表示

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

### ショートコード

#### comment.html

JIRAのコメントを表示するためのショートコード：

```markdown
{{< comment author="user@example.com" date="2024-01-15" >}}
コメント本文
{{< /comment >}}
```

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

### hugo.toml の設定例

```toml
baseURL = 'https://example.org/'
languageCode = 'ja-JP'
title = 'My JIRA Issues'
theme = 'hugo-theme-issues'

[markup.goldmark.renderer]
  unsafe = true

[markup.goldmark.parser.attribute]
  block = true
  title = true

[taxonomies]
  tag = "tags"
  fix_version = "fix_versions"
  affected_version = "affected_versions"

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

  [[menus.main]]
    name = 'affected versions'
    pageRef = '/affected_versions'
    weight = 32

[module.hugoVersion]
  extended = false
  min = '0.146.0'
```

### CSS変数

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

## パフォーマンス最適化

4,000ページ超の大規模サイトでも高速にビルドするため、以下の最適化を実施しています：

### newScratch インデックス（section.html / sidebar-left.html）

`where` による O(N) スキャンと `in` による O(N) 線形探索を、`newScratch` の辞書インデックスで O(1) ルックアップに置換。計算量を O(N²) → O(N) に改善。

### partialCached による重複計算の排除

| テンプレート | キャッシュキー | 効果 |
|---|---|---|
| head.html | `"global"` | 4,215回 → 1回 |
| header.html | `"global"` | 4,215回 → 1回 |
| footer.html | `"global"` | 4,215回 → 1回 |
| sidebar-left.html | `.RelPermalink` | セクション単位でキャッシュ |
| head/css.html | `"global"` | 4,215回 → 1回 |
| head/js.html | `"global"` | 4,215回 → 1回 |

### ビルド時間の改善実績

| 指標 | 最適化前 | 最適化後 |
|---|---|---|
| 全体ビルド時間 | ~2時間 | ~2分 |
| section.html | 1分54秒 | 1.5秒 |
| header.html 累積 | 4分07秒 | 103ms |

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

MIT License - 詳細は [LICENSE](./LICENSE) を参照してください。

## 関連リンク

- [Hugo公式ドキュメント](https://gohugo.io/)
- [Pagefind](https://pagefind.app/)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
