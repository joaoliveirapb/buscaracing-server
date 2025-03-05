import type { Prisma } from '@prisma/client'

export interface ImagesRepository {
  create(data: Prisma.ImageCreateManyInput[]): Promise<void>
  delete(id: string): Promise<void>
}
