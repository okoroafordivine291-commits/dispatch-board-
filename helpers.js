export function formatJobType(type) {
  if (!type) return 'Full time'
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

export function slugifyCompany(name) {
  return encodeURIComponent(name)
}

export function jobTypeCode(type) {
  const map = {
    full_time: 'FT',
    part_time: 'PT',
    contract: 'CT',
    freelance: 'FR',
    internship: 'IN',
  }
  return map[type] || 'FT'
}
