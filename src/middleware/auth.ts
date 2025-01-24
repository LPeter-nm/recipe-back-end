import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"; 

type RequestWithUser = Request & {
  user?: string | JwtPayload; 
};

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "O token não foi fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Erro ao verificar token",
      message: error,
    });
  }
};