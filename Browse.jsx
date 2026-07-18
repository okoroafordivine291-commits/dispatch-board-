import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useJobs } from './JobsContext.jsx'
import JobCard from './JobCard.jsx'
import FilterSidebar from './FilterSidebar.jsx'
import SearchBar from './SearchBar.jsx'
import { JobListSkeleton } from './Skeleton.jsx'

export default function Browse() {
  const { jobs, loading } = useJobs()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.candidate_required_location).filter(Boolean))].sort(),
    [jobs]
  )
  const jobTypes = useMemo(
    () => [...new Set(jobs.map((j) => j.job_type).filter(Boolean))].sort(),
    [jobs]
  )
  const categories = useMemo(
    () => [...new Set(jobs.map((j) => j.category).filter(Boolean))].sort(),
    [jobs]
  )

  const filtered = useMemo(() => {
    let result = [...jobs]
    if (query) {
      result = result.filter((j) => j.title.toLowerCase().includes(query.toLowerCase()))
    }
    if (selectedLocation !== 'all') {
      result = result.filter((j) => j.candidate_required_location === selectedLocation)
    }
    if (selectedType !== 'all') {
      result = result.filter((j) => j.job_type === selectedType)
    }
    if (selectedCategory !== 'all') {
      result = result.filter((j) => j.category === selectedCategory)
    }
    return result
  }, [jobs, query, selectedLocation, selectedType, selectedCategory])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl uppercase mb-1">Browse jobs</h1>
      <p className="font-mono text-xs text-navy/50 mb-6">{filtered.length} open postings</p>

      <div className="mb-10">
        <SearchBar initialValue={query} onSearch={setQuery} />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <FilterSidebar
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          jobTypes={jobTypes}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <JobListSkeleton />
        ) : filtered.length === 0 ? (
          <div className="flex-1 py-24 text-center">
            <p className="font-display text-xl uppercase mb-2">Board's empty here.</p>
            <p className="font-body text-sm text-navy/60">Try a different search or clear your filters.</p>
          </div>
        ) : (
          <div className="space-y-5 flex-1">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
