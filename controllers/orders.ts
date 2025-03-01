import { Request, Response } from "express";
import { countOrders, createOrder, filterProducts, getAllOrders, getOrderById, getOrderHistory, updateOrder } from "../services/order";
export const createOrderController = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const USER= req.user;
      const {products} = req?.body;
      const filteredProducts=await filterProducts(products); 
      if ('Error' in filteredProducts) {
        console.error("Ocurrió un error:", filteredProducts.Error);
        res.status(400).json(filteredProducts.Error)
        return
      } 
      const order= await createOrder(USER.id,filteredProducts)
       res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const getOrderHistoryController = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
      const USER= req.user;
       const page = parseInt(req.query.page as string) || 1;
           const limit = parseInt(req.query.limit as string) || 10;
           const skip = (page - 1) * limit;
         
           // Consulta a la base de datos usando Prisma
           let orders=await getOrderHistory(USER.id,skip,limit)
     
         const totalItems = await countOrders()
         
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
      const USER= req.user as User;
      const {orderId,orderStatus} = req?.body;
      let order= await getOrderById(orderId);
      if(!order)  res.status(404).json("Orden no encontrada");
       let newOrder= await updateOrder(orderId,{orderStatus})
       res.status(200).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const getAllOrderHistoryController = async (req: Request, res: Response) => {
    try {
     
       const page = parseInt(req.query.page as string) || 1;
           const limit = parseInt(req.query.limit as string) || 10;
           const skip = (page - 1) * limit;
         
           // Consulta a la base de datos usando Prisma
           let orders=await getAllOrders(skip,limit)
     
         const totalItems = await countOrders();
         
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