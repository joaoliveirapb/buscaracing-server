import { PrismaMotosRepository } from '@/repositories/prisma/prisma-motos.repository'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images.repository'
import { LocalStorageProvider } from '@/storage/local/local-storage-service'
import { UpdateMotoUseCase } from '../update-moto.use-case'

export function makeUpdateMotoUseCase() {
  const motosRepository = new PrismaMotosRepository()
  const imagesRepository = new PrismaImagesRepository()
  const storageProvider = new LocalStorageProvider()

  const updateMotoUseCase = new UpdateMotoUseCase(
    motosRepository,
    imagesRepository,
    storageProvider
  )

  return updateMotoUseCase
}
