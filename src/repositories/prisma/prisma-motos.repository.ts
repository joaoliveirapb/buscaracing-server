import type { Prisma } from '@prisma/client'
import type { MotosRepository } from '../motos.repository'
import { prisma } from '@/lib/prisma'

export class PrismaMotosRepository implements MotosRepository {
  async getAll() {
    const motos = await prisma.moto.findMany({
      include: { images: true },
    })
    return motos
  }

  async create(data: Prisma.MotoCreateInput) {
    const moto = await prisma.moto.create({ data })
    return moto
  }
}
