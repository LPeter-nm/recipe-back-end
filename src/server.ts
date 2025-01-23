import express from 'express'
import cors from 'cors'

import { RecipeRoute } from './routes/RouteRecipe'
import { UserRoute } from './routes/RouteUser'


const app = express()
const port = 4000

app.use(express.json())
app.use(cors({origin: '*'}))

app.use(UserRoute)
app.use(RecipeRoute)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log('Server running...')
})