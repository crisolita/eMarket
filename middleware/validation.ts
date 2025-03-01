import Joi from "joi";
import { AuthRequest } from "../types/app";

/// Esta expresion regular para la contrasena contempla lo siguiente
// Mínimo 8 caracteres de longitud
// ✅ Al menos 1 letra mayúscula (A-Z)
// ✅ Al menos 1 número (0-9)
// ✅ Al menos 1 carácter especial 
// Ejemplos de contraseñas válidas
// 🔹 Abcdef1!
// 🔹 P@ssw0rd123
// 🔹 XyZ9#qwerty
const regexPass=  new RegExp(
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?])[A-Za-z0-9`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?]{8,}$/
)
const messagesPassword={
  "string.base": `Contraseña debe ser de tipo texto`,
  "string.empty": `Contraseña no puede estar vacio`,
  "string.min": `Contraseña debe tener al menos 8 caracteres`,
  "string.required": `Contraseña es requerida`,
  "string.pattern.base": "No cumple las condiciones de contraseña",
}
const messageEmail={
    "string.default": "El email debe ser valido",
    "string.required": `Email es requerido`,
    "string.email": "Debe ser un email valido",
}
/// USER
export const querySchemaRegistro = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
     regexPass
    )
    .messages(messagesPassword),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages(messageEmail),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});


export const querySchemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "string.default": "El email debe ser valido" }),
  password: Joi.string()
    .required()
    .pattern(
      regexPass
    )
    .messages(messagesPassword),
});


/// ####################### BACKOFFICE #########################
export const querySchemaCreateProduct = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price:Joi.number().positive().required(),
    stock:Joi.number().positive().integer().required()
  });
  export const querySchemaUpdateProduct = Joi.object({
    id:Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    price:Joi.number().positive(),
    stock:Joi.number().positive().integer()
  });
  export const querySchemaDeleteProduct = Joi.object({
    id: Joi.string().required()
  });
  /// ####################### ORDERS #########################

  export const querySchemaCreateOrder = Joi.object({
    products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required()
  });
  export const querySchemaUpdateOrder = Joi.object({
    orderId:Joi.number().integer().positive().required(),
    orderStatus:Joi.string().valid('PENDIENTE_PAGO',
  'PAGADO',
  'ENTREGADO',
  'CANCELADO')
  });