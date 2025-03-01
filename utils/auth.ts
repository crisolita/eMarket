import jwt from "jsonwebtoken";

export const JWT_PRIVATE_KEY = process.env.JWTKEY? process.env.JWTKEY :"KEY";

export const createJWT = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      time: Date.now(),
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "72h",
    }
  );
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, JWT_PRIVATE_KEY);
  return user;
};