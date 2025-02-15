import type { Image, Moto } from '@prisma/client'
import type { MotosRepository } from '@/repositories/motos.repository'

export class GetMotosUseCase {
  constructor(private motosRepository: MotosRepository) {}

  async execute(): Promise<(Moto & { images: Image[] })[]> {
    const motos = await this.motosRepository.getAll()

    return motos
  }
}
