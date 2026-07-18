export function JobListSkeleton({ count = 6 }) {
  return (
    <div className="space-y-5 flex-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ticket flex animate-pulse">
          <div className="flex-1 p-6">
            <div className="h-3 bg-navy/10 w-1/4 mb-3" />
            <div className="h-5 bg-navy/10 w-2/3 mb-3" />
            <div className="h-3 bg-navy/10 w-1/3 mb-4" />
            <div className="flex gap-2">
              <div className="h-5 bg-navy/10 w-20" />
              <div className="h-5 bg-navy/10 w-24" />
            </div>
          </div>
          <div className="hidden sm:block w-20 shrink-0 border-l-2 border-dashed border-navy/10" />
        </div>
      ))}
    </div>
  )
}
