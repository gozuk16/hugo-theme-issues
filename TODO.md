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
- [ ] ビルド時間の計測・検証（hugo --templateMetrics）

## ドキュメントとテストの整備

- [ ] TODO.mdを最新状況に更新 ← 実施中
- [ ] CHANGELOG.mdをアップデート
- [ ] Makefileを作成
- [ ] README.mdを充実させる
- [ ] ビジュアルテストドキュメントを作成
