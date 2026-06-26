install:
	git pull
	npm install
	timedatectl set-timezone Europe/Moscow

lint:
	npx eslint .

fix-lint:
	npx eslint --fix .

ungit:
	rm -rf .git
	rm .gitignore

# Internal docker logs
docker-logs:
	docker-compose logs --tail=0 --follow
	
# Per-container statistics	
docker-stats:
	docker stats

# Container disk usage
docker-files:
	docker system df

# Run on the production server
docker-build-prod:
	git pull
	docker compose build
	docker compose --compatibility up
	yes | docker system prune


# Run locally (localhost)
docker-build-dev:
	docker compose -f docker-compose.dev.yml build
	docker compose -f docker-compose.dev.yml up
	yes | docker system prune

docker-clear:
	docker rm -f $$(docker ps -qa)
	docker rmi -f $$(docker images -aq)
	docker system prune