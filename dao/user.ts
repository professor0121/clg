import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};
