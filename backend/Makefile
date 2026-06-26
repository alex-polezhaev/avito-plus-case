install:
	git pull
	npm ci

restart:
	node scripts/restart-container.js
	make install

test:
	npm test

lint:
	npx eslint .

fix-lint:
	npx eslint --fix .

doc:
	rm -rf docs
	npm run docs

# Manually trigger the cache-refresh cron (requires CRON_SECRET and BACKEND_DOMAIN in env)
update-table-values:
	curl -H "x-cron-secret: $$CRON_SECRET" $$BACKEND_DOMAIN/cron/update_all_acc_values

start-mongo:
	sudo systemctl start mongod

mongo-status:
	sudo systemctl status mongod
