import { Role } from '@saas/auth'
import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    userId: string
    role: Role
    organizationId: string
  }
}

export async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organization/${orgSlug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
