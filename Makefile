up:
	docker-compose -p crmarket up --build -d

dev:
	docker-compose -p crmarket up -d

down:
	docker-compose -p crmarket down

bash:
	docker exec -it crmarket-app bash