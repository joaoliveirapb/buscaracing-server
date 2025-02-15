import type { Image, Moto, Prisma } from '@prisma/client'

export interface MotosRepository {
  getAll(): Promise<(Moto & { images: Image[] })[]>
  create(data: Prisma.MotoCreateInput): Promise<Moto>
}
