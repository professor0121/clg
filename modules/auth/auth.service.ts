import { generateAccessToken, generateRefreshToken, hashPassword } from "@/lib";
import { registerInput } from "./auth.schema";
import { findUserByEmail ,createUser} from "@/dao";
import { channelWrapper } from "@/config";

async function registerUserService(data: registerInput) {
  const existingUser = await findUserByEmail(data.email);

  if(existingUser){
    throw new Error("User Already Exists !");
  }

  const hashedPassword= await hashPassword(data.password)
    const user = await createUser({
    username:data.username,
    email: data.email,
    password: hashedPassword,
  })

  await channelWrapper.sendToQueue("user.created",{
    id:user.id,
    email:user.email
  })

  const accessToken = generateAccessToken({id:user.id});
  const refreshToken= generateRefreshToken({id:user.id});

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  }
}

export {
    registerUserService
}

