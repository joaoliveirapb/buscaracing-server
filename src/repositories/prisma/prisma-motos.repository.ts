import type { Image, Moto, Prisma } from '@prisma/client'
import type { MotosRepository } from '../motos.repository'
import { prisma } from '@/lib/prisma'

export class PrismaMotosRepository implements MotosRepository {
  async getAll() {
    const motos = await prisma.moto.findMany({
      include: { images: true },
    })
    return motos
  }

  async findById(id: string) {
    const moto = await prisma.moto.findUnique({
      where: { id },
      include: { images: true },
    })
    return moto
  }

  async create(data: Prisma.MotoCreateInput) {
    const moto = await prisma.moto.create({ data })
    return moto
  }

  async delete(id: string) {
    await prisma.moto.delete({
      where: { id },
    })
  }
}
