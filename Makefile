.PHONY: server

server-build:
	cd ./server; \
	poetry install

server:
	cd ./server; \
	poetry run uvicorn main:app --reload