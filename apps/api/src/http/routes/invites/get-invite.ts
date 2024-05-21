import { BadRequestError } from '@/http/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { rolesSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/invites/:inviteId',
    {
      schema: {
        tags: ['invites'],
        summary: 'Get a invite details',
        params: z.object({
          inviteId: z.string(),
        }),
        response: {
          200: z.object({
            invite: z.object({
              createdAt: z.date(),
              id: z.string().uuid(),
              email: z.string().email(),
              role: rolesSchema,
              author: z
                .object({
                  id: z.string().uuid(),
                  email: z.string().email(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().nullable(),
                })
                .nullable(),
              organization: z.object({ name: z.string() }),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { inviteId } = request.params

      const invite = await prisma.invite.findUnique({
        where: { id: inviteId },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              email: true,
              name: true,
              avatarUrl: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
      })

      if (!invite) {
        throw new BadRequestError('Invite not found')
      }

      return reply.status(200).send({ invite })
    }
  )
}
