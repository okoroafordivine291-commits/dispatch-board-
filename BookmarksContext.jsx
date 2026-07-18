import { createContext, useContext, useEffect, useState } from 'react'

const BookmarksContext = createContext(null)

export function BookmarksProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dispatch-bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('dispatch-bookmarks', JSON.stringify(ids))
  }, [ids])

  function toggleBookmark(id) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  function isBookmarked(id) {
    return ids.includes(id)
  }

  return (
    <BookmarksContext.Provider value={{ ids, toggleBookmark, isBookmarked, count: ids.length }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext)
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarksProvider')
  return ctx
}
