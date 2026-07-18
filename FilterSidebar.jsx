import { formatJobType } from '../utils/helpers.js'

export default function FilterSidebar({
  locations,
  selectedLocation,
  onLocationChange,
  jobTypes,
  selectedType,
  onTypeChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <aside className="w-full md:w-56 shrink-0 space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">Location</p>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full border border-navy/20 bg-white text-sm font-body py-2 px-2"
        >
          <option value="all">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">Job type</p>
        <ul className="space-y-2 font-body text-sm">
          <li>
            <button
              onClick={() => onTypeChange('all')}
              className={`hover:text-orange transition-colors ${selectedType === 'all' ? 'text-orange' : ''}`}
            >
              All types
            </button>
          </li>
          {jobTypes.map((t) => (
            <li key={t}>
              <button
                onClick={() => onTypeChange(t)}
                className={`hover:text-orange transition-colors ${selectedType === t ? 'text-orange' : ''}`}
              >
                {formatJobType(t)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">Category</p>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border border-navy/20 bg-white text-sm font-body py-2 px-2"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </aside>
  )
}
