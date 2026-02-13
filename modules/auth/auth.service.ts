import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/lib";
import { registerInput, LoginInput } from "./auth.schema";
import { findUserByEmail, createUser } from "@/dao";
import { channelWrapper } from "@/config";

async function registerUserService(data: registerInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User Already Exists !");
  }

  const hashedPassword = await hashPassword(data.password);
  const user = await createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });

  await channelWrapper.sendToQueue("user.created", {
    id: user.id,
    email: user.email,
  });

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  return {
    user: {
      id: user.id,
      username:user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}

async function loginUserService(data: LoginInput) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid Credentials !");
  }

  const comparePass = comparePassword(data.password, user.password);

  if (!comparePass) {
    throw new Error("Invalid Credentials !");
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  return {
    user: {
      id: user.id,
      username:user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}
export { registerUserService, loginUserService };
