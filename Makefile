include .env

#DOCKER COMPOSE

# dev environment

.PHONY : build

build:

	docker-compose build

.PHONY : up

up:

	docker-compose up -d

.PHONY : down

down:

	docker-compose down

.PHONY : logs

logs:

	docker-compose logs -f

	# production environment

.PHONY : build-production

build-production:

	docker-compose -f docker-production.yml build

.PHONY : up-production

up-production:

	docker-compose -f docker-production.yml up -d

.PHONY : down-production

down-production:

	docker-compose -f docker-production.yml down


# PRISMA

.PHONY : dev

dev:

	npm run-script dev
