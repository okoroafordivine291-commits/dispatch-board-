import { createContext, useContext, useEffect, useState } from 'react'
import { fetchJobs } from '../services/api.js'

const JobsContext = createContext(null)

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState(null)

  useEffect(() => {
    fetchJobs()
      .then(({ jobs, source }) => {
        setJobs(jobs)
        setSource(source)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <JobsContext.Provider value={{ jobs, loading, source }}>
      {children}
    </JobsContext.Provider>
  )
}

export function useJobs() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobs must be used inside JobsProvider')
  return ctx
}
