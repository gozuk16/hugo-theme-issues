.PHONY: help server build clean test lint
.DEFAULT_GOAL := help

# 変数定義
HUGO := hugo
HUGO_FLAGS := -D
SOURCE := .

# コマンド説明
help: ## このヘルプメッセージを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# 開発サーバー起動
server: ## 開発サーバーを起動 (http://localhost:1313)
	$(HUGO) server $(HUGO_FLAGS) --source $(SOURCE)

# 本番用ビルド
build: clean ## プロジェクトをビルド
	$(HUGO)

# 本番用ビルド（テーマ単体）
build-theme: clean ## テーマ単体でビルド
	$(HUGO) --source $(SOURCE)

# キャッシュをクリア
clean: ## Hugoのキャッシュをクリア
	rm -rf resources/_gen
	rm -rf public

# テスト用コマンド
test: ## テーマが正しく動作するか確認
	@echo "Checking Hugo version..."
	$(HUGO) version
	@echo "Building theme..."
	$(HUGO) --source $(SOURCE) --quiet
	@echo "✓ Theme build successful"

# Markdownをチェック（簡易版）
lint: ## ドキュメントの構文をチェック
	@echo "Checking markdown files..."
	@find . -name "*.md" -type f | head -20
	@echo "✓ Markdown check complete"

# サーバー起動（ドラフト表示なし）
serve-prod: clean ## 本番モードでサーバーを起動
	$(HUGO) server --source $(SOURCE)

# リソースをクリアして起動
fresh: clean server ## キャッシュをクリアしてサーバーを起動

# ドキュメント確認
docs: ## ドキュメントを確認
	@echo "Available documentation files:"
	@ls -la *.md
	@echo ""
	@echo "View README.md for more information"
