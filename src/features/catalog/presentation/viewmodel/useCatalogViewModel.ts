import { useState } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import { useCatalogListViewModel } from './useCatalogListViewModel'
import { useCatalogEditorViewModel } from './useCatalogEditorViewModel'

export function useCatalogViewModel({
  kind,
  session,
}: {
  kind: 'customers' | 'products'
  session: Session
}) {
  const [error, setError] = useState('')
  const list = useCatalogListViewModel(kind, session, setError)
  const editor = useCatalogEditorViewModel(kind, session, list, setError)
  return { ...list, ...editor, error }
}
