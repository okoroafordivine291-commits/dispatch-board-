export default function Footer() {
  return (
    <footer className="bg-navy text-chalk mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl uppercase mb-2">Dispatch</p>
          <p className="text-sm text-chalk/60 font-body">Work orders, filled.</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">Explore</p>
          <ul className="space-y-2 text-sm font-body text-chalk/70">
            <li>Browse jobs</li>
            <li>Companies</li>
            <li>Bookmarks</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">Help</p>
          <ul className="space-y-2 text-sm font-body text-chalk/70">
            <li>How it works</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-orange mb-3">About</p>
          <ul className="space-y-2 text-sm font-body text-chalk/70">
            <li>Demo project</li>
            <li>Front-end only</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-chalk/10 py-4 text-center text-xs font-mono text-chalk/40">
        © {new Date().getFullYear()} Dispatch. Demo board, front-end only.
      </div>
    </footer>
  )
}
