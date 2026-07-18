import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import JobCard from '../components/JobCard.jsx'

export default function Bookmarks() {
  const { jobs, loading } = useJobs()
  const { ids } = useBookmarks()

  const bookmarkedJobs = useMemo(
    () => jobs.filter((j) => ids.includes(j.id)),
    [jobs, ids]
  )

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center font-mono text-sm text-navy/50">Loading…</div>
  }

  if (bookmarkedJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-2xl uppercase mb-4">Nothing pinned yet.</p>
        <p className="font-body text-sm text-navy/60 mb-8">Tap the pin on any posting to save it here.</p>
        <Link
          to="/browse"
          className="inline-block font-mono text-xs uppercase tracking-wide border border-navy px-6 py-3 hover:bg-navy hover:text-chalk transition-colors"
        >
          Browse jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl uppercase mb-1">Pinned jobs</h1>
      <p className="font-mono text-xs text-navy/50 mb-10">{bookmarkedJobs.length} saved</p>

      <div className="space-y-5">
        {bookmarkedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
