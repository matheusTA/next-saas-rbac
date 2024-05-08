import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { rolesSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get all organization where user is a member',
          security: [
            {
              bearerAuth: [],
            },
          ],
          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  role: rolesSchema,
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const organizations = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: {
                role: true,
              },
              where: {
                userId,
              },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        })

        const organizationsWithUserRole = organizations.map(
          ({ members, ...org }) => {
            return {
              ...org,
              role: members[0].role,
            }
          }
        )

        return reply.status(200).send({
          organizations: organizationsWithUserRole,
        })
      }
    )
}
