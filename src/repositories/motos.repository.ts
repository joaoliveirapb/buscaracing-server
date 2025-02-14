import type { Moto, Prisma } from '@prisma/client'

export interface MotosRepository {
  create(data: Prisma.MotoCreateInput): Promise<Moto>
}
