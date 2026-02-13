import Redis from "ioredis"
import { REDIS_URL,NODE_ENV } from "@/env"

const globalForRedis = global as unknown as {
  redis: Redis | undefined
}

export const redis =
  globalForRedis.redis ??
  new Redis(REDIS_URL as string, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
  })

if (NODE_ENV !== "production") {
  globalForRedis.redis = redis
}
