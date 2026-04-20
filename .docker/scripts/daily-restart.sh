#!/bin/sh
set -eu

INTERVAL="${RESTART_INTERVAL_SECONDS:-86400}"
SERVICE="${RESTART_TARGET_SERVICE:-app}"

_truncate_json_log() {
  cid="$1"
  if [ "${TRUNCATE_CONTAINER_LOGS:-0}" != "1" ]; then
    return 0
  fi
  logpath="$(docker inspect -f '{{.LogPath}}' "$cid" 2>/dev/null || true)"
  if [ -z "$logpath" ]; then
    return 0
  fi
  if [ -w "$logpath" ]; then
    echo "$(date): truncating json log ${logpath}"
    truncate -s 0 "$logpath" 2>/dev/null || true
  else
    echo "$(date): log truncate skipped (path not writable). On Linux VPS ensure /var/lib/docker/containers is mounted on daily-restart; set TRUNCATE_CONTAINER_LOGS=0 to silence."
  fi
}

while true; do
  sleep "$INTERVAL"

  if [ -n "${RESTART_CONTAINER_NAME:-}" ]; then
    echo "$(date): restarting container name ${RESTART_CONTAINER_NAME}"
    if docker restart "${RESTART_CONTAINER_NAME}"; then
      _cid="$(docker inspect -f '{{.Id}}' "${RESTART_CONTAINER_NAME}" 2>/dev/null || true)"
      if [ -n "$_cid" ]; then
        _truncate_json_log "$_cid"
      fi
    else
      echo "$(date): restart failed for ${RESTART_CONTAINER_NAME}"
    fi
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
  if docker restart "${CID}"; then
    _truncate_json_log "${CID}"
  else
    echo "$(date): restart failed for ${CID}"
  fi
done
