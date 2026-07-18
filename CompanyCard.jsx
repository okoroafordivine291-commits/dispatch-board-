import { Link } from 'react-router-dom'
import { slugifyCompany } from '../utils/helpers.js'

export default function CompanyCard({ name, jobCount }) {
  return (
    <Link
      to={`/company/${slugifyCompany(name)}`}
      className="ticket flex flex-col justify-between p-6 hover:border-orange transition-colors"
    >
      <div className="w-10 h-10 bg-navy text-chalk font-display text-lg flex items-center justify-center mb-4">
        {name.charAt(0).toUpperCase()}
      </div>
      <h3 className="font-display text-lg uppercase tracking-tight mb-1">{name}</h3>
      <p className="font-mono text-xs text-navy/50 uppercase">
        {jobCount} open {jobCount === 1 ? 'role' : 'roles'}
      </p>
    </Link>
  )
}
