# TODO

## コードスタイルの追加

- [x] CSSにコード要素（code、pre）のスタイルを追加
- [x] ブランチを作成してコミット
- [x] PRを作成（PR #7）

## メンションスタイルの追加

- [x] CSSに.mentionスタイルを追加
- [x] ブランチを作成してコミット
- [x] PRを作成（PR #8）

## 左サイドバーのレイアウト実装

- [x] 左サイドバー（sidebar-left.html）を実装
  - [x] 3階層構造対応（エピック→子issue→孫issue）
  - [x] Issue Type別アイコン表示
  - [x] インデント機能の実装
  - [x] アクティブページハイライト
- [x] ブランチを作成してコミット
- [x] PRを作成（PR #9）

## ビルドパフォーマンス最適化

- [x] section.html の O(n²) → O(n) 最適化（newScratch インデックス導入）
- [x] sidebar-left.html の O(n²) → O(n) 最適化（同上）
- [x] baseof.html の footer.html を partialCached 化
- [x] head.html の partialCached キーを "global" に最適化
- [x] issue_key が未設定のページでのビルドエラー修正（nil ガード追加）
- [x] menu.html の静的化（IsMenuCurrent/HasMenuCurrent → JS移行）
- [x] header.html を partialCached 化（"global" キー）
- [x] head.html を partialCached 化（.RelPermalink キー）
- [ ] ビルド時間の計測・検証（hugo --templateMetrics）

## sidebar-left のナビゲーション改善

- [x] sidebar-nav.html パーシャル作成（Menu + Projects + タクソノミーナビ）
- [x] section.html の sidebar-left を sidebar-nav.html に変更
- [x] taxonomy.html の sidebar-left を sidebar-nav.html に変更
- [x] term.html の sidebar-left を sidebar-nav.html に変更
- [x] CSS スタイル追加（.sidebar-nav）
- [ ] 動作確認（hugo server -D）

## pagefind 検索高速化（短期チューニング）

- [x] `baseof.html` に `data-baseurl` 属性を追加（JS から baseURL 取得用）
- [x] `baseof-inline.js` に issue key ダイレクトジャンプを追加（`BOFL-123` 入力 + Enter で即遷移）
- [x] ブランチ作成・コミット・PR作成
- [ ] 親プロジェクト `hugo-jira/pagefind.yml` のコミット（別リポジトリ）

## pagefind 検索高速化（中期: Meilisearch 移行）

- [ ] `layouts/index.json` 新設（全 page を JSON 出力）
- [ ] 親プロジェクトに `docker-compose.yml` 追加（Meilisearch）
- [ ] `Makefile` に `index:` ターゲット追加（差分インデックス投入）
- [ ] `head.html` / `baseof-inline.js` / `main.css` を InstantMeiliSearch ベースに差し替え
- [ ] pagefind 撤去・`README.md` 手順更新

## ドキュメントとテストの整備

- [ ] TODO.mdを最新状況に更新
- [ ] CHANGELOG.mdをアップデート
- [ ] Makefileを作成
- [ ] README.mdを充実させる
- [ ] ビジュアルテストドキュメントを作成
