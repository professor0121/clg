import { redis } from "./redis"

export async function setCache(
  key: string,
  value: unknown,
  ttl?: number
) {
  const data = JSON.stringify(value)

  if (ttl) {
    await redis.set(key, data, "EX", ttl)
  } else {
    await redis.set(key, data)
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

export async function deleteCache(key: string) {
  await redis.del(key)
}
