# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
