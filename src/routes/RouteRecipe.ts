import { Router } from "express";
import { CreateRecipe, ShowRecipe, IndexRecipe, UpdateRecipe, DeleteRecipe} from '../controllers/RecipeController'
import { authMiddleware } from "../middleware/auth";
const routes = Router();

routes.post('/recipe', authMiddleware, CreateRecipe)
routes.get('/recipe/:id', authMiddleware, ShowRecipe)
routes.get('/recipes', authMiddleware,IndexRecipe)
routes.patch('/recipe/:id', authMiddleware, UpdateRecipe)
routes.delete('/recipe', authMiddleware, DeleteRecipe)

export {routes as RecipeRoute}