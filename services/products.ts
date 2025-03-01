import prisma from "../prisma/prisma";

export const createProduct = async (data: {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  return await prisma.product.create({
    data: { ...data },
  });
};
export const updateProduct = async (
  id: string,
  data: { name: string; description: string; price: number; stock: number },
) => {
  return await prisma.product.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const countProducts = async () => {
  return await prisma.product.count();
};
export const getAllProducts = async (skip: number, limit: number) => {
  return await prisma.product.findMany({ skip, take: limit });
};
export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};
export const deleteProductById = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};
