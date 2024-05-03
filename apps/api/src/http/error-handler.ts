import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/anauthorized-error'

type FastifyErrorHnadler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHnadler = async (
  error,
  request,
  reply
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Bad Request',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  // send error to some observability platform

  return reply.status(500).send({ message: 'Internal server error.' })
}
