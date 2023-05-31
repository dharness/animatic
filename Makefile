VENV_DIR = .venv

.PHONY: server server-build

server-venv:
	@cd ./server; \
    if [ ! -d $(VENV_DIR) ]; then \
        python3 -m venv $(VENV_DIR); \
	else \
		echo ".venv already exists, skipping..."; \
    fi

server-build:
	@cd ./server; \
	. .venv/bin/activate; \
	which pip; \
	pip install -r requirements.txt

server:
	cd ./server; \
	. .venv/bin/activate; \
	python -m uvicorn main:app --reload