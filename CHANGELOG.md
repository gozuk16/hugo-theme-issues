# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- issue key ダイレクトジャンプ: 検索バーに `BOFL-123` 形式で入力して Enter を押すと、pagefind を介さず即座に該当 issue ページへ遷移
- `baseof.html` の `<html>` タグに `data-baseurl` 属性を追加（JS から Hugo の baseURL を取得するため）
- `hugo-jira/pagefind.yml` 新設: `force_language: ja` と不要要素の `exclude_selectors` を設定し、pagefind インデックスサイズとビルド時間を削減

### Fixed
- section.html / sidebar-left.html で issue_key が未設定のページでビルドエラーが発生する問題を修正
  - `$page.Params.issue_key | default ""` で nil ガードを追加

### Changed
- section/taxonomy/term ページの sidebar-left を sidebar-nav.html に変更
  - メニュー + プロジェクト一覧 + タクソノミーナビを統合表示
  - partialCached "global" キーでキャッシュ可能（ページ非依存、アクティブ状態はJS）
  - sidebar-taxonomy.html の呼び出しを sidebar-nav.html に置換
- section.html / sidebar-left.html の O(n²) ループを newScratch インデックスで O(n) に最適化
  - `where` による重複スキャンを parent→children 辞書に置換
  - `in` スライス線形探索を `Scratch.Get` の O(1) ルックアップに置換
  - 表示ループと孤立issue検出を1パスに統合
- menu.html の静的化: IsMenuCurrent/HasMenuCurrent を除去し、アクティブ状態を JavaScript で付与
- header.html を partialCached 化（menu.html 静的化により全ページ共通出力になったため）
- head.html の title タグを baseof.html に移動し、head.html を "global" キーで partialCached 化（4,215回→1回に削減）
- baseof.html の footer.html を partialCached 化（全ページ同一内容のため "global" キー）
- head.html の css.html / js.html の partialCached キーを "global" に変更（全ページ共通）
- sidebar-left.html に partialCached を導入してビルド高速化
  - 同じセクション内でサイドバー計算を1回に削減
  - アクティブページのハイライトをJavaScriptに移行

### Added
- taxonomy/termページのレイアウト改善
  - taxonomy.htmlとterm.htmlでチケットをテーブル形式で表示
  - sidebar-leftにタグクラウド、Fix Versions、Affected Versionsを表示
  - sidebar-rightを非表示にして2ペイン構成
- コード要素（`code` タグ）と `pre` タグのスタイルを追加
  - インラインコードにはグレーの背景と枠線を追加
  - コードブロックにはスクロール可能な背景を追加
  - `pre code` 要素の重複スタイルを回避
- メンション要素（`.mention` クラス）のスタイルを追加
  - GitHub風の青系背景でメンションを強調
  - ホバー時に背景色とボーダー色が変化
  - WCAG AA基準のコントラスト比に準拠
- 左サイドバーのレイアウト（`sidebar-left.html`）を実装
  - プロジェクトナビゲーション：3階層構造（エピック→子issue→孫issue）
  - Issue Type別アイコン表示：Epic、Story、Task、Sub-task、Bug、その他に対応
  - インデント機能：子issueと孫issueを視覚的に区別
  - アクティブページハイライト：現在のページを強調表示
  - 親階層へのナビゲーション：⬆️ボタンでエピック単位に遡航可能
  - 孤立issue管理：どのエピックにも属さないissueを分離表示
  - レスポンシブ対応：モバイル端末では非表示（768px以下）

## [0.1.0] - Previous releases

### Added
- Initial theme release
- List indentation and styling
- Epic grouping enhancements
