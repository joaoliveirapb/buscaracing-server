import { makeGetMotosUseCase } from '@/use-cases/factories/make-get-motos-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getMotosController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const getMotosUseCase = makeGetMotosUseCase()

  const motos = await getMotosUseCase.execute()

  return reply.status(200).send({ motos })
}
