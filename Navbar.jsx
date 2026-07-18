import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarksContext.jsx'

export default function Navbar() {
  const { count } = useBookmarks()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/browse?q=${encodeURIComponent(query)}` : '/browse')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-navy text-chalk border-b-4 border-orange">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="font-display text-2xl tracking-wide uppercase shrink-0">
          Dispatch<span className="text-orange">.</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-sm items-center border-b border-chalk/30 focus-within:border-orange"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search job titles…"
            className="w-full bg-transparent py-2 text-sm font-body outline-none placeholder:text-chalk/40 text-chalk"
          />
        </form>

        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wide">
          <Link to="/browse" className="hover:text-orange transition-colors">Browse</Link>
          <Link to="/bookmarks" className="relative hover:text-orange transition-colors">
            Bookmarks
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-orange text-navy text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <button
          className="md:hidden text-xs font-mono uppercase"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-chalk/10 px-6 py-4 flex flex-col gap-4 font-mono text-xs uppercase">
          <form onSubmit={handleSearch} className="flex border-b border-chalk/30">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job titles…"
              className="w-full bg-transparent py-2 outline-none placeholder:text-chalk/40 text-chalk normal-case font-body"
            />
          </form>
          <Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link>
          <Link to="/bookmarks" onClick={() => setMenuOpen(false)}>Bookmarks ({count})</Link>
        </div>
      )}
    </header>
  )
}
