import type { FastifyInstance } from 'fastify'
import { createMotoController } from './controllers/create-moto.controller'
import { getMotosController } from './controllers/get-motos.controller'
import { deleteMotoController } from './controllers/delete-moto.controller'
import { updateMotoController } from './controllers/update-moto.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/motos', createMotoController)
  app.get('/motos', getMotosController)
  app.delete('/motos/:id', deleteMotoController)
  app.put('/motos/:id', updateMotoController)
}
