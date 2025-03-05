import type { Moto } from '@prisma/client'
import type { ImagesRepository } from '@/repositories/images.repository'
import type { MotosRepository } from '@/repositories/motos.repository'
import type { StorageProvider } from '@/storage/storage-provider'
import { generateSlug } from '@/utils/generate-slug'

interface UpdateMotoUseCaseRequest {
  name?: string
  description?: string
  price?: string
  brand?: string
  model?: string
  year?: number
  km?: string
  images?: {
    filename: string
    url: string
    path: string
  }[]
  imagesToDelete?: {
    id: string
    path: string
  }[]
}

interface UpdateMotoUseCaseResponse {
  updatedMoto: Moto
}

export class UpdateMotoUseCase {
  constructor(
    private motosRepository: MotosRepository,
    private imagesRepository: ImagesRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute(
    id: string,
    {
      name,
      description,
      price,
      brand,
      model,
      year,
      km,
      images,
      imagesToDelete,
    }: UpdateMotoUseCaseRequest
  ): Promise<UpdateMotoUseCaseResponse> {
    const updatedMoto = await this.motosRepository.update(id, {
      slug: name ? generateSlug(name) : undefined,
      name,
      description,
      price: price ? Number.parseFloat(price) : undefined,
      brand,
      model,
      year,
      km: km ? Number.parseFloat(km) : undefined,
    })

    const imagesToUpdate: Array<{
      url: string
      path: string
      moto_id: string
    }> = []

    if (images) {
      for (const image of images) {
        imagesToUpdate.push({
          url: image.url,
          path: image.path,
          moto_id: updatedMoto.id,
        })
      }
    }

    await this.imagesRepository.create(imagesToUpdate)

    if (imagesToDelete) {
      for (const image of imagesToDelete) {
        await this.storageProvider.deleteFile(image.path)
        await this.imagesRepository.delete(image.id)
      }
    }

    return { updatedMoto }
  }
}
