import express from 'express'
import { RecipeRoute } from './routes/RouteRecipe'
import { UserRoute } from './routes/RouteUser'
const app = express()
const port = 3000

app.use(UserRoute)
app.use(RecipeRoute)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log('Server running...')
})