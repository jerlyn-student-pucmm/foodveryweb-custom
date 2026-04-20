#!/bin/sh
set -eu

INTERVAL="${RESTART_INTERVAL_SECONDS:-86400}"
SERVICE="${RESTART_TARGET_SERVICE:-app}"

while true; do
  sleep "$INTERVAL"

  if [ -n "${RESTART_CONTAINER_NAME:-}" ]; then
    echo "$(date): restarting container name ${RESTART_CONTAINER_NAME}"
    docker restart "${RESTART_CONTAINER_NAME}" || echo "$(date): restart failed for ${RESTART_CONTAINER_NAME}"
    continue
  fi

  PROJECT="${COMPOSE_PROJECT_NAME:?Set COMPOSE_PROJECT_NAME or RESTART_CONTAINER_NAME}"
  CID="$(docker ps -q \
    -f "label=com.docker.compose.project=${PROJECT}" \
    -f "label=com.docker.compose.service=${SERVICE}" \
    -f "status=running" | head -n1)"

  if [ -z "$CID" ]; then
    echo "$(date): no running container for project=${PROJECT} service=${SERVICE}"
    continue
  fi

  echo "$(date): restarting ${CID} (${PROJECT}/${SERVICE})"
  docker restart "${CID}" || echo "$(date): restart failed for ${CID}"
done
