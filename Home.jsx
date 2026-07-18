import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobs } from './JobsContext.jsx'
import JobCard from './JobCard.jsx'
import { JobListSkeleton } from './Skeleton.jsx'

export default function Home() {
  const { jobs, loading } = useJobs()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const latest = useMemo(() => jobs.slice(0, 5), [jobs])

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/browse?q=${encodeURIComponent(query)}` : '/browse')
  }

  return (
    <div>
      <section className="board-grid bg-navy text-chalk">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24">
          <p className="font-mono text-xs uppercase tracking-wider text-orange mb-4">
            Board updated daily — {jobs.length || '—'} open postings
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase leading-[1.05] mb-6 max-w-2xl">
            Find the work order that fits.
          </h1>
          <p className="font-body text-chalk/70 max-w-md mb-8">
            Browse real openings, filter by location and type, and pin the ones worth a second look.
          </p>
          <form onSubmit={handleSearch} className="flex max-w-lg border-2 border-chalk/30 focus-within:border-orange">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, e.g. Frontend Engineer"
              className="flex-1 bg-transparent px-4 py-3 text-sm font-body outline-none placeholder:text-chalk/40"
            />
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-wide bg-orange text-navy px-6 hover:bg-mustard transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl uppercase">Latest postings</h2>
          <button
            onClick={() => navigate('/browse')}
            className="font-mono text-xs uppercase tracking-wide hover:text-orange transition-colors"
          >
            View all →
          </button>
        </div>
        {loading ? (
          <JobListSkeleton count={5} />
        ) : (
          <div className="space-y-5">
            {latest.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
