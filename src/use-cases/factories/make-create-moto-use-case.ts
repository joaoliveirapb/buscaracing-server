import { PrismaMotosRepository } from '@/repositories/prisma/prisma-motos.repository'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images.repository'
import { CreateMotoUseCase } from '../create-moto.use-case'

export function makeCreateMotoUseCase() {
  const motosRepository = new PrismaMotosRepository()
  const imagesRepository = new PrismaImagesRepository()

  const createMotoUseCase = new CreateMotoUseCase(
    motosRepository,
    imagesRepository
  )

  return createMotoUseCase
}
