import {LoginUser, CreateUser} from "../controllers/UserController"
import { Router } from "express"

const routes = Router()

routes.post('/login', LoginUser)

export { routes as UserRoute } 