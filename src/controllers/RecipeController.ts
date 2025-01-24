import { Request, Response } from 'express';
import { prisma } from '../connections/prisma';
import { JwtPayload } from 'jsonwebtoken';

type User = {
  id: string;
  name: string;
  email: string;
}

type RequestWithUser = Request &{
  user: string | JwtPayload | User;
}
export const CreateRecipe = async (req: RequestWithUser, res: Response): Promise<any> => {
  try {
    const {title, description, 
      ingredients, preparation_time, 
      difficulty, category, imagem_url} = req.body
    const { id } = req.user as User;
      
      const recipe = await prisma.recipe.create({
        data:{
          title, 
          description, 
          ingredients, 
          preparation_time: Number(preparation_time), 
          difficulty, 
          category, 
          imagem_url, 
          userId: id
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

export const IndexRecipe = async (req: RequestWithUser, res: Response): Promise<any> =>{
  try {
    const {id} = req.user as User;

    const recipe = await prisma.recipe.findMany({
      where:{
        userId: id,
      },
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


export const ShowRecipe = async (req: RequestWithUser, res: Response): Promise<any> =>{
  try {
    const {id} = req.params
    const recipe = await prisma.recipe.findFirst({
      where:{
        id: id
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

export const UpdateRecipe = async (req: RequestWithUser, res: Response): Promise<any> =>{
  try {
    const {title, description, 
      ingredients, preparation_time, 
      difficulty, category, imagem_url} = req.body
    const {id} = req.params

    const recipe = await prisma.recipe.update({
      where:{
        id: id
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

export const updateFavorite = async (req: RequestWithUser, res: Response): Promise<any> =>{
 try {
  const {id} = req.params
  const recipeCheck = await prisma.recipe.findUnique({where: {id}})
  if(!recipeCheck) return res.status(404).json({ error: 'Receita não encontrada'})

  const oldFavorite = await prisma.recipe.findUnique({
    where: {id},
    select: {favorite: true}
  })

  let newStatus;
  if(oldFavorite?.favorite === false){
    newStatus = true
  } else {
    newStatus = false
  }

  const updateFavorite = await prisma.recipe.update({
    where: {id},
    data: {favorite: newStatus}
  })

  return res.status(200).json(updateFavorite)
 } catch(error){
  return res.status(400).json({
    message: 'Erro ao atualizar receita',
    error: error  
  })
 }

}
export const DeleteRecipe = async (req: RequestWithUser, res: Response): Promise<any> =>{
  try {
    const {id} = req.params;

    await prisma.recipe.delete({
      where:{
        id: id
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