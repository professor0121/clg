import { registerSchema } from "./auth.schema"
import { registerUserService } from "./auth.service"

export async function registerController(body: unknown) {
  const parsed = registerSchema.parse(body)
  return registerUserService(parsed)
}
