import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import console from 'console'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentOrgSlugOnCookies() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const currentOrgSlugOnCookies = getCurrentOrgSlugOnCookies()

  if (!currentOrgSlugOnCookies) {
    return null
  }

  const { membership } = await getMembership(currentOrgSlugOnCookies)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
