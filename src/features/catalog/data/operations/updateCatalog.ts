import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { CatalogKind } from '../../domain/models/CatalogKind'

export function updateCatalog(
  kind: CatalogKind,
  session: Session,
  id: number,
  payload: Record<string, unknown>,
) {
  return api(`/${kind}/${id}`, session, 'PUT', payload)
}
