import { Link } from 'react-router-dom'
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5"
      aria-label="Jaoo — início"
    >
      <span className="bg-primary text-primary-foreground shadow-primary/15 grid size-9 place-items-center rounded-lg text-lg font-black shadow-sm">
        J
      </span>
      {!compact && (
        <span className="text-xl font-bold tracking-tight">
          jaoo<span className="text-primary">.</span>
        </span>
      )}
    </Link>
  )
}
