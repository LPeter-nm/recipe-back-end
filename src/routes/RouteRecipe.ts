import { Router } from "express";
import { CreateRecipe, ShowRecipe, IndexRecipe, UpdateRecipe, DeleteRecipe} from '../controllers/RecipeController'
const routes = Router();

routes.post('/recipe', CreateRecipe)
routes.get('/recipe/:id', ShowRecipe)
routes.get('/recipes', IndexRecipe)
routes.patch('/recipe/:id', UpdateRecipe)
routes.delete('/recipe', DeleteRecipe)

export {routes as RecipeRoute}