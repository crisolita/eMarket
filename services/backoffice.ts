import { PrismaClient } from "@prisma/client";

export const createProduct = async (
  data: { id:string, name: string; description: string, price:number, stock:number},
  prisma: PrismaClient
) => {
  return await prisma.product.create({
   data:{...data}
  });
};
export const updateProduct = async (id:string,
    data: { name: string; description: string, price:number, stock:number},
    prisma: PrismaClient
  ) => {
    return await prisma.product.update({
        where: { id },
        data: {
          ...data,
        },
      });
  };

  export const getAllProducts=  async (skip:number,limit:number,
    prisma: PrismaClient
  ) => {
    return await prisma.product.findMany({skip,take:limit});
  }; 
  export const getProductById=  async (id:string,
    prisma: PrismaClient
  ) => {
    return await prisma.product.findUnique({where:{id}});
  }; 
  export const deleteProductById=  async (
    id:string,
    prisma: PrismaClient
  ) => {
    return await prisma.product.delete({where:{id}});
  }; 