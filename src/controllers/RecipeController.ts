import { Request, Response } from 'express';
import { prisma } from '../connections/prisma';

export const StoreRecipe = async (req: Request, res: Response) =>{
  try {
    const {title, description, 
      ingredients, preparation_time, 
      difficulty, category, imagem_url, userId} = req.body
    
      const recipe = await prisma.recipe.create({
        data:{
          title, 
          description, 
          ingredients, 
          preparation_time, 
          difficulty, 
          category, 
          imagem_url, 
          userId
        }
      });

      return res.status(201).json(recipe)
  } catch (error) {
    return res.status(400).json({
      message: 'Erro na criação de receita',
      error: error
    })
  }
}

export const IndexRecipe = async (req: Request, res: Response) =>{
  try {
    const recipe = await prisma.recipe.findMany({
      select:{
        id: true,
        title: true, 
        description: true, 
        ingredients: true, 
        preparation_time: true, 
        difficulty: true, 
        category: true, 
        imagem_url: true, 
        userId: true
      }
    });

    return res.status(200).json(recipe)
    
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao encontrar as receitas',
      error: error
    })
  }
}

export const ShowRecipe = async (req: Request, res: Response) =>{
  try {
    const {id} = req.params
    const recipe = await prisma.recipe.findFirst({
      where:{
        id: String(id)
      }
    })

    return res.status(200).json(recipe)
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao encontrar receita',
      error: error
    })
  }
}

export const UpdateRecipe = async (req: Request, res: Response) =>{
  try {
    const {title, description, 
      ingredients, preparation_time, 
      difficulty, category, imagem_url} = req.body
    const {id} = req.params

    const recipe = await prisma.recipe.update({
      where:{
        id: String(id)
      },
      data:{
        title, 
        description, 
        ingredients, 
        preparation_time, 
        difficulty, 
        category, 
        imagem_url
      }
    });

    return res.status(200).json(recipe)
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao atualizar receita',
      error: error
    })
  }
}

export const DeleteRecipe = async (req: Request, res: Response) =>{
  try {
    const {id} = req.params;

    await prisma.recipe.delete({
      where:{
        id: String(id)
      }
    });

    return res.status(200).json({message: 'A receita foi deletada!'})
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao deletar receita',
      error: error
    })
  }
}