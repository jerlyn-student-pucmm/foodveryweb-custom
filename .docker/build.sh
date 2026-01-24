#!/bin/bash
# Build script with BuildKit enabled for faster builds

# Enable BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Build and start containers
docker compose up -d --build
