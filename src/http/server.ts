import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { appRoutes } from './routes'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB por arquivo
    files: 15, // Limite de 15 arquivos por upload
  },
})

app.register(appRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
