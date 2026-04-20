import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { applyWebRedisRateLimit } from './lib/server/webRateLimitRedis';

export async function proxy(request: NextRequest) {
  const limited = await applyWebRedisRateLimit(request);
  if (!limited.ok) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': String(limited.retryAfter) },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon(?:/|\\?|$)|apple-icon(?:/|\\?|$)|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
};
