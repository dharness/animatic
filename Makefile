.PHONY: server server-build

server-build:
	cd ./server; \
	pip install --upgrade pip; \
	pip install poetry==1.2.0; \
	rm poetry.lock; \
	poetry lock; \
	python -m poetry install; \
	poetry --version

server:
	cd ./server; \
	poetry run uvicorn main:app --reload