import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY; 

type RequestWithUser = Request & {
  user?: string | JwtPayload; 
};

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "O token não foi fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Erro ao verificar token",
      message: error,
    });
  }
};