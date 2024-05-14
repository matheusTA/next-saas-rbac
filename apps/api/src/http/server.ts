import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { errorHandler } from './_errors'
import { getProfile } from './routes/auth/get-profile'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from './routes/organizations/create-organization'
import { getOrganization } from './routes/organizations/get-organization'
import { getOrganizations } from './routes/organizations/get-organizations'
import { updateOrganization } from './routes/organizations/update-organization'
import { shutdownOrganization } from './routes/organizations/shutdown-organization'
import { transferOrganization } from './routes/organizations/transfer-organization'
import { createProject } from './routes/projects/create-project'
import { deleteProject } from './routes/projects/delete-project'
import { getProject } from './routes/projects/get-project'
import { getProjects } from './routes/projects/get-projects'
import { updateProject } from './routes/projects/update-project'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API',
      description: 'Full-stack SaaS app with multi-tenant and RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(getProject)
app.register(getProjects)
app.register(createProject)
app.register(updateProject)
app.register(deleteProject)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server started')
})
