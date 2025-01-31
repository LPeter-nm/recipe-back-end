import { Router } from "express";
import { CreateRecipe, ShowRecipe, IndexRecipe, UpdateRecipe, DeleteRecipe, updateFavorite} from '../controllers/RecipeController'
import { authMiddleware } from "../middleware/auth";
const routes = Router();

routes.post('/recipe', authMiddleware, CreateRecipe)
routes.get('/recipe/:id', authMiddleware, ShowRecipe)
routes.get('/recipes', authMiddleware,IndexRecipe)
routes.patch('/recipe/:id', authMiddleware, UpdateRecipe)
routes.put('/recipe/favorite/:id', authMiddleware, updateFavorite)
routes.delete('/recipe/:id', authMiddleware, DeleteRecipe)

export {routes as RecipeRoute}