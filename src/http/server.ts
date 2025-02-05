import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.get('/hello', (_, reply) => {
  reply.status(200).send('Hello World!')
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
