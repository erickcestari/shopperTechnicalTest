import { Request, Response, Router } from "express"
import productsRoutes from './productRoutes'

const routes = Router()

routes.use('/products', productsRoutes)

// Rotas não existentes
routes.use('*', (request: Request, response: Response, next) => {
  return response
    .status(404)
    .send({ mensagem: 'Rota não encontrada', status: 404 })
})

export default routes