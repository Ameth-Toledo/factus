import { api } from './api.ts'
import type { Session } from '../../features/auth/domain/models/Session'

export async function allPages<T>(
  path: string,
  session: Session,
): Promise<T[]> {
  const result: T[] = []
  for (let offset = 0; ; offset += 100) {
    const page = await api<T[]>(`${path}?limit=100&offset=${offset}`, session)
    result.push(...page)
    if (page.length < 100) return result
  }
}
