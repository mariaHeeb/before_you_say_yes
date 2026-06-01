import { FlagCard } from './FlagCard'
import { CheckCircle2 } from 'lucide-react'

type Flag = { id?: string; title: string; description: string }

export function GreenFlagsList({ flags }: { flags: Flag[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm font-semibold text-emerald-700">
          Green Flags
          <span className="ml-1.5 font-normal text-emerald-400">({flags.length})</span>
        </h3>
      </div>
      {flags.length === 0
        ? <p className="text-sm text-slate-400">No green flags identified.</p>
        : <div className="space-y-2">{flags.map((f, i) => <FlagCard key={f.id ?? i} {...f} type="GREEN" />)}</div>
      }
    </div>
  )
}
