import { PrismaMotosRepository } from '@/repositories/prisma/prisma-motos.repository'
import { GetMotosUseCase } from '../get-motos.use-case'

export function makeGetMotosUseCase() {
  const motosRepository = new PrismaMotosRepository()
  const getMotosUseCase = new GetMotosUseCase(motosRepository)

  return getMotosUseCase
}
