import type { Prisma } from '@prisma/client'
import type { ImagesRepository } from '../images.repository'
import { prisma } from '@/lib/prisma'

export class PrismaImagesRepository implements ImagesRepository {
  async create(data: Prisma.ImageCreateManyInput[]) {
    await prisma.image.createMany({ data })
  }
}
