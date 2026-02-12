import {z} from "zod";

export const registerSchema=z.object({
    username:z.string().min(6,"Invalid username"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password Must be at least 6 characters")
})

export type registerInput=z.infer<typeof registerSchema>