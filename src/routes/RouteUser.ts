import {LoginUser, CreateUser, ShowUser} from "../controllers/UserController"
import { Router } from "express"
import { authMiddleware } from "../middleware/auth"

const routes = Router()

routes.post('/login', LoginUser)
routes.post('/register',CreateUser)
routes.get('/user', authMiddleware, ShowUser)


export { routes as UserRoute } 