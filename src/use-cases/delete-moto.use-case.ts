import type { MotosRepository } from '@/repositories/motos.repository'
import type { StorageProvider } from '@/storage/storage-provider'

export class DeleteMotoUseCase {
  constructor(
    private motosRepository: MotosRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const moto = await this.motosRepository.findById(id)

    if (!moto) {
      throw new Error('Moto not found')
    }

    for (const image of moto.images) {
      await this.storageProvider.deleteFile(image.path)
    }

    await this.motosRepository.delete(moto.id)
  }
}
