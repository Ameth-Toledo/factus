import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { CatalogKind } from '../../domain/models/CatalogKind'

export function deleteCatalog(kind: CatalogKind, session: Session, id: number) {
  return api(`/${kind}/${id}`, session, 'DELETE')
}
