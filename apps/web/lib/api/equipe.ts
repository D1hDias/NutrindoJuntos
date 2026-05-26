import type { Membro } from '@/types'
import { getEquipe as getEquipeFromMock } from '../mock-data'

/**
 * Fetch all team members
 */
export async function getTeamMembers() {
  const response = await getEquipeFromMock()
  return response.docs
}

/**
 * Fetch a single team member by ID
 */
export async function getTeamMemberById(id: string) {
  const response = await getEquipeFromMock()
  const member = response.docs.find((m: Membro) => m.id === id)
  return member || null
}
