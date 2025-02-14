import type { StorageProvider } from '../storage-provider'
import type { MultipartFile } from '@fastify/multipart'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string

  constructor() {
    this.uploadDir = path.join(__dirname, '../../../uploads')
  }

  async saveFile(partFile: MultipartFile) {
    const { filename, file } = partFile
    const uniqueFilename = `${randomUUID()}-${filename}`
    const url = `uploads/${uniqueFilename}`
    const fullPath = path.join(this.uploadDir, uniqueFilename)

    await pipeline(file, fs.createWriteStream(fullPath))

    return {
      filename: uniqueFilename,
      url,
      path: fullPath,
    }
  }
}
