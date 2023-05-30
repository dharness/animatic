.PHONY: server server-build

server-build:
	cd ./server; \
	pip install -r requirements.txt

server:
	cd ./server; \
	poetry run uvicorn main:app --reload