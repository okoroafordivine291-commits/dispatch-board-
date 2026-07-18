import { Link } from 'react-router-dom'
import { useBookmarks } from './BookmarksContext.jsx'
import { formatJobType, timeAgo, jobTypeCode, slugifyCompany } from './helpers.js'

export default function JobCard({ job }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(job.id)

  return (
    <div className="ticket flex relative">
      <button
        onClick={() => toggleBookmark(job.id)}
        className="absolute -top-2 left-4 z-10"
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <span
          data-active={bookmarked}
          className={`pushpin inline-block w-4 h-4 rounded-full border-2 ${
            bookmarked ? 'bg-orange border-orange' : 'bg-chalk border-navy/30'
          }`}
        />
      </button>

      <Link to={`/jobs/${job.id}`} className="flex-1 p-6 pt-7 min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-wider text-navy/50 mb-2">
          {job.category} · {timeAgo(job.publication_date)}
        </p>
        <h3 className="font-display text-lg uppercase tracking-tight leading-tight mb-2 hover:text-orange transition-colors">
          {job.title}
        </h3>
        <Link
          to={`/company/${slugifyCompany(job.company_name)}`}
          onClick={(e) => e.stopPropagation()}
          className="font-body text-sm text-navy/70 hover:text-orange transition-colors"
        >
          {job.company_name}
        </Link>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="font-mono text-[11px] uppercase bg-mustard/20 text-navy px-2 py-1">
            {job.candidate_required_location}
          </span>
          {job.salary && (
            <span className="font-mono text-[11px] uppercase bg-navy/5 text-navy px-2 py-1">
              {job.salary}
            </span>
          )}
        </div>
      </Link>

      <div className="ticket-stub-line hidden sm:flex flex-col items-center justify-center w-20 shrink-0 py-6">
        <span className="font-display text-2xl text-navy/80">{jobTypeCode(job.job_type)}</span>
        <span className="font-mono text-[9px] uppercase text-navy/40 mt-1 text-center px-1">
          {formatJobType(job.job_type)}
        </span>
      </div>
    </div>
  )
}
