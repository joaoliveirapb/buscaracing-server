export function generateSlug(name: string): string {
  const normalizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')

  const timestamp = Date.now()

  const slug = `${normalizedName}-${timestamp}`

  return slug
}
