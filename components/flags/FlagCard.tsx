import { cn } from '@/lib/utils'

type Props = {
  title: string; description: string; type: 'RED' | 'GREEN'; severity?: string | null
}

const severityStyle: Record<string, string> = {
  HIGH: 'bg-rose-100 text-rose-700 ring-rose-200',
  MEDIUM: 'bg-amber-100 text-amber-700 ring-amber-200',
  LOW: 'bg-slate-100 text-slate-600 ring-slate-200',
}

export function FlagCard({ title, description, type, severity }: Props) {
  return (
    <div className={cn(
      'flag-card ring-1',
      type === 'RED' ? 'bg-rose-50 ring-rose-100' : 'bg-emerald-50 ring-emerald-100',
    )}>
      <div className="flex items-start justify-between gap-2">
        <h4 className={cn('text-sm font-semibold', type === 'RED' ? 'text-rose-800' : 'text-emerald-800')}>
          {title}
        </h4>
        {severity && type === 'RED' && (
          <span className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1',
            severityStyle[severity] ?? severityStyle.LOW,
          )}>
            {severity}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{description}</p>
    </div>
  )
}
