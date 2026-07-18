import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce.js'

export default function SearchBar({ initialValue = '', onSearch }) {
  const [value, setValue] = useState(initialValue)
  const debounced = useDebounce(value, 300)

  useEffect(() => {
    onSearch(debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className="border-b-2 border-navy/20 focus-within:border-orange">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title or keyword…"
        className="w-full bg-transparent py-3 text-lg font-body outline-none placeholder:text-navy/30"
      />
    </div>
  )
}
