function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const DATABASE_URL = requiredEnv("DATABASE_URL")
const RABBITMQ_URL = requiredEnv("RABBITMQ_URL")

const NODE_ENV = process.env.NODE_ENV || "development"

const BCRYPT_SALT_ROUND = parseInt(
  process.env.BCRYPT_SALT_ROUND || "10",
  10
)

const JWT_ACCESS_SECRET = requiredEnv("JWT_ACCESS_SECRET")
const JWT_REFRESH_SECRET = requiredEnv("JWT_REFRESH_SECRET")

const JWT_ACCESS_EXPIRES =
  process.env.JWT_ACCESS_EXPIRES || "15m"

const JWT_REFRESH_EXPIRES =
  process.env.JWT_REFRESH_EXPIRES || "7d"

const REDIS_URL=process.env.REDIS_URL
export {
  DATABASE_URL,
  RABBITMQ_URL,
  NODE_ENV,
  BCRYPT_SALT_ROUND,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
  REDIS_URL,
}
