import type { FastifyInstance } from 'fastify'
import { createMotoController } from './controllers/create-moto.controller'
import { getMotosController } from './controllers/get-motos.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/motos', createMotoController)
  app.get('/motos', getMotosController)
}
