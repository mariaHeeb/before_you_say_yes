import { FlagCard } from './FlagCard'
import { ShieldAlert } from 'lucide-react'

type Flag = { id?: string; title: string; description: string; severity?: string | null }

export function RedFlagsList({ flags }: { flags: Flag[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-rose-500" />
        <h3 className="text-sm font-semibold text-rose-700">
          Red Flags
          <span className="ml-1.5 font-normal text-rose-400">({flags.length})</span>
        </h3>
      </div>
      {flags.length === 0
        ? <p className="text-sm text-slate-400">No red flags identified.</p>
        : <div className="space-y-2">{flags.map((f, i) => <FlagCard key={f.id ?? i} {...f} type="RED" />)}</div>
      }
    </div>
  )
}
