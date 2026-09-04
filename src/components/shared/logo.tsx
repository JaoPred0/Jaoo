import { Link } from 'react-router-dom'
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5"
      aria-label="Jaoo — início"
    >
      <span className="bg-brand shadow-brand/20 grid size-9 place-items-center rounded-xl text-lg font-black text-white shadow-lg">
        J
      </span>
      {!compact && (
        <span className="text-xl font-bold tracking-tight">
          jaoo<span className="text-brand-bright">.</span>
        </span>
      )}
    </Link>
  )
}
