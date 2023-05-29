.PHONY: server server-build

server-build:
	cd ./server; \
	poetry self update; \
	poetry install

server:
	cd ./server; \
	poetry run uvicorn main:app --reload