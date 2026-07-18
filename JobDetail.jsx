import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import { formatJobType, timeAgo, slugifyCompany } from '../utils/helpers.js'

export default function JobDetail() {
  const { id } = useParams()
  const { jobs, loading } = useJobs()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const job = useMemo(() => jobs.find((j) => String(j.id) === String(id)), [jobs, id])

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center font-mono text-sm text-navy/50">Loading…</div>
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-xl uppercase mb-4">Posting not found.</p>
        <Link to="/browse" className="font-mono text-xs uppercase underline">Back to board</Link>
      </div>
    )
  }

  const bookmarked = isBookmarked(job.id)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/browse" className="font-mono text-xs uppercase tracking-wide text-navy/50 hover:text-orange">
        ← Back to board
      </Link>

      <div className="ticket mt-8 p-8 md:p-10 relative">
        <button
          onClick={() => toggleBookmark(job.id)}
          className="absolute -top-3 left-8 flex items-center gap-2"
        >
          <span
            data-active={bookmarked}
            className={`pushpin inline-block w-5 h-5 rounded-full border-2 ${
              bookmarked ? 'bg-orange border-orange' : 'bg-chalk border-navy/30'
            }`}
          />
        </button>

        <p className="font-mono text-xs uppercase tracking-wider text-navy/50 mb-3 mt-2">
          {job.category} · Posted {timeAgo(job.publication_date)}
        </p>
        <h1 className="font-display text-3xl uppercase tracking-tight mb-3">{job.title}</h1>
        <Link
          to={`/company/${slugifyCompany(job.company_name)}`}
          className="font-body text-navy/70 hover:text-orange transition-colors"
        >
          {job.company_name}
        </Link>

        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          <span className="font-mono text-xs uppercase bg-mustard/20 text-navy px-3 py-1.5">
            {job.candidate_required_location}
          </span>
          <span className="font-mono text-xs uppercase bg-navy/5 text-navy px-3 py-1.5">
            {formatJobType(job.job_type)}
          </span>
          {job.salary && (
            <span className="font-mono text-xs uppercase bg-navy/5 text-navy px-3 py-1.5">
              {job.salary}
            </span>
          )}
        </div>

        <div
          className="font-body text-sm text-navy/80 leading-relaxed prose-sm max-w-none [&_a]:text-orange [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        <div className="flex gap-4 mt-10 pt-8 border-t border-navy/10">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wide bg-navy text-chalk px-6 py-3 hover:bg-orange hover:text-navy transition-colors"
          >
            Apply now
          </a>
          <button
            onClick={() => toggleBookmark(job.id)}
            className="font-mono text-xs uppercase tracking-wide border border-navy px-6 py-3 hover:bg-navy hover:text-chalk transition-colors"
          >
            {bookmarked ? 'Unpin' : 'Pin for later'}
          </button>
        </div>
      </div>
    </div>
  )
}
