.PHONY: server server-build

server-build:
	cd ./server; \
	poetry lock; \
	poetry install

server:
	cd ./server; \
	poetry run uvicorn main:app --reload