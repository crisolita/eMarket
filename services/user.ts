import prisma from "../prisma/prisma";

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (
  id: number,
  data: {
    password?: string;
    authToken?: string;
    firstname?: string;
    lastname?: string;
  },
) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      ...data,
    },
  });
};

export const createUser = async (data: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) => {
  return await prisma.user.create({
    data: { ...data },
  });
};
