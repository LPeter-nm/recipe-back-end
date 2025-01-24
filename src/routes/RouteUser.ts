import {LoginUser, CreateUser, UpdateUser, IndexUser, ShowUser, DeleteUser} from "../controllers/UserController"
import { Router } from "express"
import { authMiddleware } from "../middleware/auth"

const routes = Router()

routes.post('/login', LoginUser)
routes.post('/register',CreateUser)
routes.get('/users', authMiddleware, IndexUser)
routes.get('/user', authMiddleware, ShowUser)
routes.patch('/user',authMiddleware, UpdateUser)
routes.delete('/user',authMiddleware,  DeleteUser)

export { routes as UserRoute } 