import {prisma} from "../connections/prisma"
import {randomInt} from 'node:crypto'
import { Request, Response } from "express"
import bcrypt from 'bcryptjs';

export const LoginUser = async (req: Request, res: Response): Promise<any> => {
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

  } catch (error) {
    return res.status(401).json({
      error: "Falha de autenticação", 
      success: false
    })
  }
}

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    

    const emailCheck = await prisma.user.findUnique({ where: { email } });
    if(emailCheck) {
      return res.status(400).json({ message: "Email já cadastrado"})
    } else {
      const randomSalt = randomInt(10, 16);
      bcrypt.hash(password, randomSalt).then(async (hash) => {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
          },
        });
      })
        return res.status(201).json({ message: "Usuário criado com sucesso"})
      
      
    }

  } catch (error) {
    return res.status(400).json({
      error: "Erro ao cadastrar usuário", 
      message: error
    })
  }
}

export const IndexUser = async (req: Request, res: Response): Promise<any> => {
  try {
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar usuários", 
      success: false
    })
  }
}

export const ShowUser = async (req: Request, res: Response): Promise<any> => {
  try {
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao listar usuário", 
      message: error
    })
  }
}

export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao Atualizar usuário", 
      message: error
    })
  }
}

export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao deletar usuário", 
      message: error
    })
  }
}