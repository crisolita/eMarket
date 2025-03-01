import {  STATUS} from "@prisma/client";
import prisma from "../prisma/prisma";

export const createOrder = async (userId:number,
    items: { productId: string, quantity: number,price:number }[],
) => {
   return await prisma.order.create({
   data:{
    userId,
    orderStatus:STATUS.PENDIENTE_PAGO,
    OrderItem:{
        create:items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
            }))
      }
    }
})
 }
 export const filterProducts = async (
  products: { productId: string; quantity: number }[],
) => {
  type Item = {
    productId: string;
    quantity: number;
    price: number;
  };

  // Obtener solo los productos necesarios de la base de datos
  const productIds = products.map(p => p.productId);
  const items = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  // Mapa para acceso rápido por ID
  const productMap = new Map(items.map(item => [item.id, item]));

  let errors: string[] = [];
  let verifiedProducts: Item[] = [];

  for (let product of products) {
    const existingProduct = productMap.get(product.productId);

    if (!existingProduct) {
      errors.push(`Este producto no existe: ${product.productId}`);
      continue;
    }

    if (product.quantity > existingProduct.stock) {
      errors.push(`Stock insuficiente para el producto: ${existingProduct.id}, disponible: ${existingProduct.stock}, Nombre: ${existingProduct.name}`);
      continue;
    }

    verifiedProducts.push({
      productId: existingProduct.id,
      quantity: product.quantity,
      price: existingProduct.price
    });

    existingProduct.stock -= product.quantity;
  }

  if (errors.length > 0) {
    return { Error: errors };
  }

  // Actualizar los stocks en batch
  await Promise.all(
    verifiedProducts.map(product =>
      prisma.product.update({
        where: { id: product.productId },
        data: { stock: productMap.get(product.productId)?.stock }
      })
    )
  );

  return verifiedProducts;
};

export async function getOrderHistory(userId: number,skip:number,limit:number) {
    return await prisma.order.findMany({skip,take:limit,
      where: { userId },
      include: {
        OrderItem: {
          include: {
            Product: true, // Incluir detalles de los productos en el pedido
          },
        },
      },
    });
  }
  export async function countOrders() {
    return await prisma.order.count()
  }
  export async function getOrderById(orderId: number) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: {
          include: {
            Product: true, // Incluir detalles de los productos en el pedido
          },
        },
      },
    });
  }
  export async function updateOrder(orderId: number,data:{orderStatus:STATUS}) {
    return await prisma.order.update({
      where: { id: orderId },
        data:{...data}
    });
  }
  export async function getOrderItem(productId: string) {
    return await prisma.orderItem.findFirst({
      where: { productId },
    });
  }
  
  export async function getAllOrders(skip:number,limit:number) {
    return await prisma.order.findMany({skip,take:limit,
      include: {
        OrderItem: {
          include: {
            Product: true, // Incluir detalles de los productos en el pedido
          },
        },
      },
    });
  }