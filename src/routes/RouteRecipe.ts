import { Router } from "express";
import { CreateRecipe, ShowRecipe, IndexRecipe, UpdateRecipe, DeleteRecipe, updateFavorite} from '../controllers/RecipeController'
import { authMiddleware } from "../middleware/auth";
const routes = Router();

routes.post('/recipe', authMiddleware, CreateRecipe)
routes.get('/recipe/:id', authMiddleware, ShowRecipe)
routes.get('/recipes', authMiddleware,IndexRecipe)
routes.put('/recipe/:id', authMiddleware, UpdateRecipe)
routes.patch('/recipe/favorite/:id', authMiddleware, updateFavorite)
routes.delete('/recipe/:id', authMiddleware, DeleteRecipe)

export {routes as RecipeRoute}