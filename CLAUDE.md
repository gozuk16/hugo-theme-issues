# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリは、Hugoの静的サイトジェネレータ用のテーマです。`hugo-theme-issues`は、JIRAのissueをMarkdownに変換して表示するために設計されたシンプルなテーマです。

## 前提条件

- Hugo v0.146.0以上が必要（`hugo.toml`で定義）
- 拡張版は不要（`extended = false`）

## よく使うコマンド

### テーマの開発

このテーマは親Hugoサイトのthemesディレクトリに配置されています。開発時は親ディレクトリに移動して実行します：

```bash
# 親ディレクトリ（hugo-jiraプロジェクト）に移動
cd ../../

# 開発サーバーを起動
hugo server -D

# 本番用ビルド
hugo
```

### テーマ単体でのテスト

このテーマディレクトリ内でテストする場合：

```bash
# サンプルコンテンツでテスト（このディレクトリで実行）
hugo server -D --source .
```

## アーキテクチャ

### ディレクトリ構造

- `layouts/` - HTMLテンプレート
  - `baseof.html` - ベーステンプレート（全ページの基本構造）
  - `home.html` - ホームページレイアウト
  - `section.html` - セクションリストページ
  - `page.html` - 個別ページ
  - `taxonomy.html` / `term.html` - タクソノミーページ（タグなど）
  - `_partials/` - 再利用可能な部分テンプレート
    - `head.html` - HTMLヘッダ部分
    - `header.html` - サイトヘッダー
    - `footer.html` - サイトフッター
    - `menu.html` - ナビゲーションメニュー（再帰的にサブメニューを処理）
- `assets/` - 処理が必要なリソース
  - `css/main.css` - メインスタイルシート
  - `js/main.js` - JavaScriptファイル
- `static/` - 静的ファイル（そのまま公開ディレクトリにコピー）
- `content/` - サンプルコンテンツ
- `archetypes/` - 新規コンテンツのテンプレート
- `i18n/` - 国際化ファイル
- `data/` - データファイル

### テンプレート階層

1. `baseof.html` がベーステンプレートとして機能
2. 各ページタイプ（home, section, page等）が`baseof.html`を継承
3. パーシャルテンプレート（`_partials/`）で共通部品を再利用

### メニューシステム

- `hugo.toml`でメニュー項目を定義（`[menus.main]`）
- `_partials/menu.html`が再帰的にメニューを生成
- アクティブページとその祖先ページに自動的にクラスを付与

### スタイリング

- シンプルなCSS（`assets/css/main.css`）
- max-width: 768pxでコンテンツを制限
- ボーダーでヘッダー/フッターを区切るミニマルなデザイン

## 開発時の注意点

### テンプレート編集

- Go Template構文を使用
- `{{ .Content }}` - ページコンテンツ
- `{{ site.Title }}` - サイトタイトル
- `{{ .RelPermalink }}` - 相対URL
- `{{ partial "name.html" . }}` - パーシャルの呼び出し

### コンテンツのフロントマター

```toml
+++
title = 'タイトル'
date = 2023-01-15T09:00:00-07:00
draft = false
tags = ['tag1', 'tag2']
+++
```
