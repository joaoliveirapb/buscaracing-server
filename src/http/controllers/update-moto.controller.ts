import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { LocalStorageProvider } from '@/storage/local/local-storage-service'
import { makeUpdateMotoUseCase } from '@/use-cases/factories/make-update-moto-use-case'

export async function updateMotoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateMotoParamsSchema = z.object({
    id: z.string(),
  })

  const updateMotoBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.coerce.number().optional(),
    km: z.string().optional(),
    images: z
      .array(
        z.object({
          filename: z.string(),
          url: z.string(),
          path: z.string(),
        })
      )
      .optional(),
    imagesToDelete: z
      .array(
        z.object({
          id: z.string(),
          path: z.string(),
        })
      )
      .optional(),
  })

  const { id } = updateMotoParamsSchema.parse(request.params)
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

  if (fields.imagesToDelete) {
    fields.imagesToDelete = JSON.parse(fields.imagesToDelete)
  }

  try {
    const {
      name,
      description,
      price,
      brand,
      model,
      year,
      km,
      images,
      imagesToDelete,
    } = updateMotoBodySchema.parse({
      ...fields,
      images: files,
      imagesToDelete: fields.imagesToDelete,
    })

    const updateMotoUseCase = makeUpdateMotoUseCase()

    await updateMotoUseCase.execute(id, {
      name,
      description,
      price,
      brand,
      model,
      year,
      km,
      images,
      imagesToDelete,
    })

    return reply.status(200).send({ message: 'moto successfully updated' })
  } catch (error) {
    console.error('Erro ao atualizar a moto:', error)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
