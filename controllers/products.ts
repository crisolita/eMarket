import { Response } from "express";
import { countProducts, createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from "../services/products";
import { v4 as uuidv4 } from 'uuid';
import { getOrderItem } from "../services/order";
import { AuthRequest } from "../types/app";


export const createProductController = async (req: AuthRequest, res: Response) => {
    try {
      const {name, description, price, stock} = req?.body;
      const product= await createProduct({id:uuidv4(),name,description,price,stock})
       res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const updateProductController = async (req: AuthRequest, res: Response) => {
    try {
      const {id,name, description, price, stock} = req?.body;
      //Buscar si existe el producto
      let product=await getProductById(id)
      if(!product) res.status(404).json("Producto no encontrado");
       product= await updateProduct(id,{name,description,price,stock},)
       res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const deleteProductController = async (req: AuthRequest, res: Response) => {
    try {
      const {id} = req?.body;
      //Buscar si existe el producto
      let orderItem=await getOrderItem(id)
      if(orderItem) res.status(400).json("Producto en un orden no puede ser eliminado");
      let product=await getProductById(id)
      if(!product) res.status(404).json("Producto no encontrado");
       product= await deleteProductById(id)
       res.status(200).json("Producto eliminado con exito");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  export const getAllProductsController = async (req: AuthRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
    
      // Consulta a la base de datos usando Prisma
      let products=await getAllProducts(skip,limit)

    const totalItems = await countProducts();
    
      // Respuesta con los datos y el total
       res.status(200).json({
        page,
        limit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };