import {prisma} from "../connections/prisma"
import {randomInt} from 'node:crypto'
import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  email: string;
}

type RequestWithUser = Request &{
  user: string | JwtPayload | User;
}

export const LoginUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });


    if(!user) return res.status(401).json({ message: "Autenticação falhou, usuário não encontrado "})

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        message: 'Senha incorreta',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    return res.json({token: token});

  } catch (error) {
    return res.status(401).json({
      error: "Falha de autenticação", 
      success: false,
    })
  }
}

export const CreateUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
  
    const emailCheck = await prisma.user.findUnique({ where: { email } });
    if(emailCheck) {
      return res.status(400).json({ message: "Email já cadastrado"})
    } else {
      const randomSalt = randomInt(10, 16);
      const hash = await bcrypt.hash(password, randomSalt)
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      return res.status(201).json({ message: "Usuário criado com sucesso"}) 
    }

  } catch (error) {
    return res.status(400).json({
      error: "Erro ao cadastrar usuário", 
      message: error
    })
  }
}

export const IndexUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        email: true,
        name: true,
        recipe: true,
      }
    })

    return res.status(200).json(users)
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar usuários", 
      success: false
    })
  }
}

export const ShowUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const {id} = req.user as User;
    const user = await prisma.user.findUnique({
      where:{
        id,
      }
    });

    return res.status(200).json(user);
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar usuário", 
      message: error
    })
  }
}

export const UpdateUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const { id } = req.user as User;
    const { name, email, password } = req.body;

    const emailCheck = await prisma.user.findFirst({
      where:{
        email,
      }
    });
    
    if(emailCheck) {
      return res.status(400).json({ message: "Email já cadastrado"})
    }
    
    const randomSalt = randomInt(10, 16);
    const hash = await bcrypt.hash(password, randomSalt)
    await prisma.user.update({
      where:{
        id,
      },
      data:{
        name,
        email,
        password: hash,
      }
    })

    return res.status(200).json({message: "Usuário atualizado!"})
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao Atualizar usuário", 
      message: error
    })
  }
}

export const DeleteUser = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const { id } = req.user as User;

    const userCheck = await prisma.user.findUnique({where: {id}})
    if(!userCheck) {
      return res.status(404).json({ error: "Usuário não encontrado"})
    }

    await prisma.user.delete({where: {id}})

    return res.status(200).json({message: "Usuário deletado com sucesso"})
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao deletar usuário", 
      message: error
    })
  }
}