export function safeLink(value: string | undefined) {
  try {
    const url = new URL(value || '')
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}
