import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { CatalogKind } from '../../domain/models/CatalogKind'

export function saveCatalog(
  kind: CatalogKind,
  session: Session,
  payload: Record<string, unknown>,
) {
  return api(`/${kind}`, session, 'POST', payload)
}
