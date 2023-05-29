.PHONY: server

server:
	cd ./server; \
	poetry run uvicorn main:app --reload