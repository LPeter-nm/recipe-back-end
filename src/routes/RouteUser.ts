import {LoginUser, CreateUser, UpdateUser, IndexUser, ShowUser, DeleteUser} from "../controllers/UserController"
import { Router } from "express"

const routes = Router()

routes.post('/login', LoginUser)
routes.post('/register',CreateUser)
routes.patch('/user/:id',UpdateUser)
routes.get('/users',IndexUser)
routes.get('/user', ShowUser)
routes.delete('/user', DeleteUser)

export { routes as UserRoute } 