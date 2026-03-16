import { fetchFromPayload } from '../payload'
import type { TeamMember } from '@/types/payload'

/**
 * Fetch all team members
 */
export async function getTeamMembers() {
  try {
    const response = await fetchFromPayload<TeamMember>(
      '/equipe?sort=order&limit=100'
    )
    return response.docs
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

/**
 * Fetch a single team member by ID
 */
export async function getTeamMemberById(id: string) {
  try {
    const response = await fetchFromPayload<TeamMember>(`/equipe/${id}`)
    return response.docs[0] || null
  } catch (error) {
    console.error('Error fetching team member:', error)
    return null
  }
}
