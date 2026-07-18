import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'
import JobCard from '../components/JobCard.jsx'

export default function CompanyProfile() {
  const { name } = useParams()
  const { jobs, loading } = useJobs()
  const decodedName = decodeURIComponent(name)

  const companyJobs = useMemo(
    () => jobs.filter((j) => j.company_name === decodedName),
    [jobs, decodedName]
  )

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center font-mono text-sm text-navy/50">Loading…</div>
  }

  if (companyJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-xl uppercase mb-4">No postings from this company right now.</p>
        <Link to="/browse" className="font-mono text-xs uppercase underline">Back to board</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/browse" className="font-mono text-xs uppercase tracking-wide text-navy/50 hover:text-orange">
        ← Back to board
      </Link>

      <div className="flex items-center gap-4 mt-8 mb-10">
        <div className="w-14 h-14 bg-navy text-chalk font-display text-2xl flex items-center justify-center shrink-0">
          {decodedName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight">{decodedName}</h1>
          <p className="font-mono text-xs text-navy/50 uppercase mt-1">
            {companyJobs.length} open {companyJobs.length === 1 ? 'role' : 'roles'}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {companyJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
