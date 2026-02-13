import { BCRYPT_SALT_ROUND } from "@/env";
import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUND);
}

async function comparePassword(password:string,hashedPassword:string) {
    return bcrypt.compare(password,hashedPassword);
}

export {
    hashPassword,
    comparePassword,
}