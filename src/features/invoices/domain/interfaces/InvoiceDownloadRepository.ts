import type { Session } from '../../../auth/domain/models/Session'

export interface InvoiceDownloadRepository {
  download(id: number, format: 'pdf' | 'xml', session: Session): Promise<Blob>
}
