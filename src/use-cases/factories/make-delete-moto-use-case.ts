import { PrismaMotosRepository } from '@/repositories/prisma/prisma-motos.repository'
import { LocalStorageProvider } from '@/storage/local/local-storage-service'
import { DeleteMotoUseCase } from '../delete-moto.use-case'

export function makeDeleteMotoUseCase() {
  const motosRepository = new PrismaMotosRepository()
  const storageProvider = new LocalStorageProvider()

  const deleteMotoUseCase = new DeleteMotoUseCase(
    motosRepository,
    storageProvider
  )

  return deleteMotoUseCase
}
