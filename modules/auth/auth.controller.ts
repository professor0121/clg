import { registerSchema,loginSchema } from "./auth.schema"
import { registerUserService ,loginUserService} from "./auth.service"

export async function registerController(body: unknown) {
  const parsed = registerSchema.parse(body)
  return registerUserService(parsed)
}


export async function loginController(body:unknown) {
  const parsed=loginSchema.parse(body)
  return loginUserService(parsed)
}