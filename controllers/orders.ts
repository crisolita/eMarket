import { Request, Response } from "express";
import { createOrder, getAllOrders, getOrderById, getOrderHistory, getWholeItems, updateOrder } from "../services/order";

export const createOrderController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
      const USER= req.user as User;
      const {items} = req?.body;
      // En esta funcion filtramos solo los productos existentes y agregamos el precio al arreglo 
      // se reduce el stock de cada producto
      const wholeItems=await getWholeItems(items,prisma); 
      const order= await createOrder(USER.id,wholeItems,prisma)
       res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const getOrderHistoryController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
      const USER= req.user as User;
       const page = parseInt(req.query.page as string) || 1;
           const limit = parseInt(req.query.limit as string) || 10;
           const skip = (page - 1) * limit;
         
           // Consulta a la base de datos usando Prisma
           let orders=await getOrderHistory(USER.id,skip,limit,prisma)
     
         const totalItems = await prisma.order.count();
         
           // Respuesta con los datos y el total
            res.status(200).json( {page,
                limit,
                total: totalItems,
                totalPages: Math.ceil(totalItems / limit),
                data: orders});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const updateOrderController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
      const USER= req.user as User;
      const {orderId,orderStatus} = req?.body;
      let order= await getOrderById(orderId,prisma);
      if(!order)  res.status(404).json("Orden no encontrada");
       let newOrder= await updateOrder(orderId,{orderStatus},prisma)
       res.status(200).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const getAllOrderHistoryController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
   
       const page = parseInt(req.query.page as string) || 1;
           const limit = parseInt(req.query.limit as string) || 10;
           const skip = (page - 1) * limit;
         
           // Consulta a la base de datos usando Prisma
           let orders=await getAllOrders(skip,limit,prisma)
     
         const totalItems = await prisma.order.count();
         
           // Respuesta con los datos y el total
            res.status(200).json( {page,
                limit,
                total: totalItems,
                totalPages: Math.ceil(totalItems / limit),
                data: orders});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };