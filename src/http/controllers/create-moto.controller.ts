import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateMotoUseCase } from '@/use-cases/factories/make-create-moto-use-case'
import { LocalStorageProvider } from '@/storage/local/local-storage-service'

export async function createMotoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createMotoBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.coerce.number(),
    km: z.string(),
    images: z.array(
      z.object({
        filename: z.string(),
        url: z.string(),
        path: z.string(),
      })
    ),
  })

  const bodyParts = request.parts()

  const fields: Record<string, any> = {}
  const files: Array<{
    filename: string
    url: string
    path: string
  }> = []

  const storageProvider = new LocalStorageProvider()

  for await (const part of bodyParts) {
    if (part.type === 'field') {
      fields[part.fieldname] = part.value
    }

    if (part.type === 'file') {
      const { filename, url, path } = await storageProvider.saveFile(part)
      files.push({ filename, url, path })
    }
  }

  try {
    const { name, description, price, brand, model, year, km, images } =
      createMotoBodySchema.parse({ ...fields, images: files })

    const createMotoUseCase = makeCreateMotoUseCase()

    await createMotoUseCase.execute({
      name,
      description,
      price,
      brand,
      model,
      year,
      km,
      images,
    })

    return reply.status(201).send()
  } catch (error) {
    console.error('Erro na criação da moto:', error)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
