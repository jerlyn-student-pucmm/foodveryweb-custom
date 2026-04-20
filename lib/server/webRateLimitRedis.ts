import type { NextRequest } from 'next/server';
import Redis from 'ioredis';

let redisInstance: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisInstance !== undefined) {
    return redisInstance;
  }
  const url = process.env.REDIS_URL?.trim();
  if (!url) {
    redisInstance = null;
    return null;
  }
  redisInstance = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
  });
  return redisInstance;
}

export function webRateLimitEnabled(): boolean {
  const raw = process.env.RATE_LIMIT_ENABLED;
  if (raw === undefined || raw === '') {
    return true;
  }
  const v = raw.toLowerCase();
  return v !== '0' && v !== 'false' && v !== 'no';
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  const n = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) {
      return first;
    }
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cf = request.headers.get('cf-connecting-ip');
  if (cf) {
    return cf.trim();
  }
  return 'unknown';
}

export type WebRateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

export async function applyWebRedisRateLimit(request: NextRequest): Promise<WebRateLimitResult> {
  if (!webRateLimitEnabled()) {
    return { ok: true };
  }

  const redis = getRedis();
  if (!redis) {
    return { ok: true };
  }

  const windowSec = parsePositiveInt(process.env.RATE_LIMIT_WINDOW_SECONDS, 60);
  const maxReq = parsePositiveInt(process.env.RATE_LIMIT_REQUESTS, 200);
  const ip = clientIp(request);
  const key = `ratelimit:foodveryweb:${ip}`;

  try {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSec);
    }
    if (count > maxReq) {
      return { ok: false, retryAfter: windowSec };
    }
  } catch {
    return { ok: true };
  }

  return { ok: true };
}
