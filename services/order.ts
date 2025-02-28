import { PrismaClient ,STATUS} from "@prisma/client";

export const createOrder = async (userId:number,
    items: { productId: string, quantity: number,price:number }[],
  prisma: PrismaClient
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
 export const getWholeItems= async (items:{ productId: string, quantity: number }[],prisma:PrismaClient)=>{
  type Item = {
    productId: string;
    quantity: number;
    price: number;
  };
  
  let wholeItems: Item[] = [];
    for(let item of items) {
        const product=await prisma.product.findUnique({where:{id:item.productId}})
        if(product && product.stock>=item.quantity) {
            /// Si existe el producto y hay suficiente completamos con el precio
            wholeItems.push({
                productId:item.productId,
                quantity:item.quantity,
                price:product.price
            })
            await prisma.product.update({where:{id:product.id},data:{stock:product.stock-item.quantity}})
        } else if( product && product.stock>0) {
            // si existe pero no hay suficiente se le coloca todo lo que haya en stock
            wholeItems.push({
                productId:item.productId,
                quantity:product.stock,
                price:product.price
            })
            await prisma.product.update({where:{id:product.id},data:{stock:0}})
        }
    }
    return wholeItems;
}
export async function getOrderHistory(userId: number,skip:number,limit:number,prisma:PrismaClient) {
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
  export async function getOrderById(orderId: number,prisma:PrismaClient) {
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
  export async function updateOrder(orderId: number,data:{orderStatus:STATUS},prisma:PrismaClient) {
    return await prisma.order.update({
      where: { id: orderId },
        data:{...data}
    });
  }
  export async function getAllOrders(skip:number,limit:number,prisma:PrismaClient) {
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