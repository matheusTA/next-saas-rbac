import { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { UnauthorizedError } from '../_errors/anauthorized-error'

export const authMiddleware = fastifyPlugin((app: FastifyInstance) => {
  app.addHook('preHandler', (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token.')
      }
    }
  })
})
