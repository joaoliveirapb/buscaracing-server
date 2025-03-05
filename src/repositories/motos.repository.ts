import type { Image, Moto, Prisma } from '@prisma/client'

export interface MotosRepository {
  getAll(): Promise<(Moto & { images: Image[] })[]>
  findById(id: string): Promise<(Moto & { images: Image[] }) | null>
  create(data: Prisma.MotoCreateInput): Promise<Moto>
  update(id: string, data: Prisma.MotoUpdateInput): Promise<Moto>
  delete(id: string): Promise<void>
}
