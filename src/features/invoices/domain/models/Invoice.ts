export type Invoice = {
  created_at: string
  updated_at: string
  id: number
  reference_code: string
  factus_reference: string
  status: string
  number: string
  cufe: string
  is_validated: boolean
  failure?: string
  factus_response: {
    data?: {
      links?: { public_url?: string; qr?: string }
      totals?: Record<string, string>
      errors?: unknown
    }
    message?: string
    errors?: unknown
  }
}
