export function getShortName(fullName: string): string {
  const parts = fullName.split(' ')
  if (parts.length === 0) return ''

  // If there's only one part, return it as is
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()

  // For multiple parts, return the first letter of each part
  return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
}
