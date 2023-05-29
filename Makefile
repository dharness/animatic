.PHONY: server server-build

server-build:
	cd ./server; \
	poetry --version

server:
	cd ./server; \
	poetry run uvicorn main:app --reload