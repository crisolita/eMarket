import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,updateUser
} from "../services/user";


export const userRegisterController = async (req: Request, res: Response):Promise<void>  => {
    try {
      // Genera un "salt" para encriptar la contraseña
      const salt = bcrypt.genSaltSync();
  
      // Extrae los datos del cuerpo de la solicitud
      const { email, password, firstname, lastname } = req?.body; 
      // Verifica si el usuario ya existe en la base de datos
      const user = await getUserByEmail(email);
      if(user) {
        res.status(400).json({ error: "Email ya registrado" });
        return
      }
        // Crea un nuevo usuario si el email no está registrado
        await createUser({
          email: email,
          password: bcrypt.hashSync(password, salt), // Encripta la contraseña antes de guardarla
          firstname,
          lastname,
        }) 
        // Responde con los datos básicos del usuario (sin la contraseña)
        res.status(200).json({ email, firstname, lastname });
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      // Si ocurre un error inesperado, responde con un código 500
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  


export const userLoginController = async (req: Request, res: Response) => {
  try {
 
    const { email, password } = req?.body;
    const user = await getUserByEmail(email);

    // Verifica si el usuario existe y si la contraseña es correcta
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ error: "Email o contraseña incorrectos" });
      return
    }
        res.status(200).json({
          email: user.email,
          userid: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          token: createJWT(user),
        });
  
  } catch (error) {
    console.log(error);
     res.status(500).json(error);
  }
};




export const getUserInfo = async (req: Request, res: Response) => {
  try {

    // @ts-ignore
    const USER = req.user as User;
    const user = await getUserById(USER.id);
    if (!user) {
     res.status(404).json({ error: "Usuario no encontrado" });
     return;
    }
     res.json({
      email: user.email,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      token: createJWT(user),
    });
  } catch (error) {
     res.status(500).json({ error: error });
  }
};


