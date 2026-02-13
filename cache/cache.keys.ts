export const CacheKeys = {
  userByEmail: (email: string) => `user:email:${email}`,
  userById: (id: string) => `user:id:${id}`,
  rateLimit: (ip: string) => `rate:ip:${ip}`,
}
