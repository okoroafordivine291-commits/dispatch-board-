import { mockJobs } from './mockJobs.js'

const REMOTIVE_URL = 'https://remotive.com/api/remote-jobs'

// Remotive is a free public API with no key required. If it's unreachable
// (offline, CORS blocked, rate limited) we fall back to local mock data so
// the app never shows a dead end.
export async function fetchJobs() {
  try {
    const res = await fetch(REMOTIVE_URL)
    if (!res.ok) throw new Error('Bad response')
    const data = await res.json()
    if (!data.jobs || !data.jobs.length) throw new Error('Empty response')
    return { jobs: data.jobs, source: 'remotive' }
  } catch (err) {
    return { jobs: mockJobs, source: 'mock' }
  }
}
