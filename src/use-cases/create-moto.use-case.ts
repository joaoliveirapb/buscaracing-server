import type { Moto } from '@prisma/client'
import type { MotosRepository } from '@/repositories/motos.repository'
import type { ImagesRepository } from '@/repositories/images.repository'
import { generateSlug } from '@/utils/generate-slug'

interface CreateMotoUseCaseRequest {
  name: string
  description: string
  price: string
  brand: string
  model: string
  year: number
  km: string
  images: {
    filename: string
    url: string
    path: string
  }[]
}

interface CreateMotoUseCaseResponse {
  moto: Moto
}

export class CreateMotoUseCase {
  constructor(
    private motosRepository: MotosRepository,
    private imagesRepository: ImagesRepository
  ) {}

  async execute({
    name,
    description,
    price,
    brand,
    model,
    year,
    km,
    images,
  }: CreateMotoUseCaseRequest): Promise<CreateMotoUseCaseResponse> {
    const slug = generateSlug(name)

    const moto = await this.motosRepository.create({
      slug,
      name,
      description,
      price: Number.parseFloat(price),
      brand,
      model,
      year,
      km: Number.parseFloat(km),
    })

    const imagesToCreate: Array<{
      url: string
      path: string
      moto_id: string
    }> = []

    for (const image of images) {
      imagesToCreate.push({
        url: image.url,
        path: image.path,
        moto_id: moto.id,
      })
    }

    await this.imagesRepository.create(imagesToCreate)

    return { moto }
  }
}
