import type { MultipartFile } from '@fastify/multipart'

export interface StorageProvider {
  saveFile(partFile: MultipartFile): Promise<{
    filename: string
    url: string
    path: string
  }>
}
