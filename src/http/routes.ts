import type { FastifyInstance } from 'fastify'
import { createMotoController } from './controllers/create-moto.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/motos', createMotoController)
}
