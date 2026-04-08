#!/bin/bash
# Build script with BuildKit enabled for faster builds

# Enable BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Parse arguments
FORCE_RECREATE=false
NO_CACHE=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --force-recreate|-f)
      FORCE_RECREATE=true
      shift
      ;;
    --no-cache|-n)
      NO_CACHE=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--force-recreate|-f] [--no-cache|-n]"
      exit 1
      ;;
  esac
done

# Build arguments
BUILD_ARGS="--build"
if [ "$NO_CACHE" = true ]; then
  BUILD_ARGS="$BUILD_ARGS --no-cache"
fi

UP_ARGS="-d"
if [ "$FORCE_RECREATE" = true ]; then
  UP_ARGS="$UP_ARGS --force-recreate"
fi

# Build and start containers (this will replace running containers)
echo "🔨 Building and starting containers..."
echo "   BuildKit: Enabled"
echo "   Force recreate: $FORCE_RECREATE"
echo "   No cache: $NO_CACHE"
echo ""

docker compose build $BUILD_ARGS && docker compose up $UP_ARGS

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build completed successfully!"
  echo "📦 Container is running and ready"
else
  echo ""
  echo "❌ Build failed"
  exit 1
fi
