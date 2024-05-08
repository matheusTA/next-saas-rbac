import { authMiddleware } from '@/http/middlewares/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get details from organization',
          security: [
            {
              bearerAuth: [],
            },
          ],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                createdAt: z.date(),
                updatedAt: z.date(),
                id: z.string().uuid(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullable(),
                avatarUrl: z.string().nullable(),
                shouldAttachUsersByDomain: z.boolean(),
                ownerId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return reply.status(200).send({
          organization,
        })
      }
    )
}
