VENV_DIR = .venv

.PHONY: build server-build

requirements:
	cd ./server; \
	poetry export --without-hashes --format=requirements.txt > requirements.txt

server-install:
	@cd ./server; \
	if [ -z "${RENDER}" ]; then \
		echo "Environment variable 'RENDER' is not set. Exiting..."; \
		exit 1; \
	fi; \
	echo "Found RENDER=${RENDER} - Running the script... "
	pip install -r requirements.txt