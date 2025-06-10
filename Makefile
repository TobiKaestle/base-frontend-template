.PHONY: serve build

pre-commit:
	pre-commit run --show-diff-on-failure --color=always --all-files

update:
	yarn upgrade-interactive --latest

build:
	docker compose build --force-rm --no-cache

build-dev:
	docker compose -f docker-compose.dev.yml build --force-rm --no-cache

build-local:
	docker compose -f docker-compose.local.yml build --force-rm --no-cache

serve-local:
	docker compose -f docker-compose.local.yml up -d
