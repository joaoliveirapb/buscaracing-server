import { makeDeleteMotoUseCase } from '@/use-cases/factories/make-delete-moto-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteMotoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteMotoParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteMotoParamsSchema.parse(request.params)

  try {
    const deleteMotoUseCase = makeDeleteMotoUseCase()

    await deleteMotoUseCase.execute(id)

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    return reply.status(500).send({ message: 'Erro ao deletar a moto' })
  }
}
