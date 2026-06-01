import { cn } from '@/lib/utils'
import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
  recommendation: 'ACCEPT' | 'DECLINE' | string
  size?: 'sm' | 'lg'
}

export function RecommendationBadge({ recommendation, size = 'lg' }: Props) {
  const isAccept = recommendation === 'ACCEPT'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-bold',
        size === 'lg' ? 'px-5 py-2.5 text-base' : 'px-2.5 py-1 text-xs',
        isAccept
          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
          : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
      )}
    >
      {isAccept
        ? <CheckCircle className={size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
        : <XCircle className={size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      }
      {recommendation}
    </span>
  )
}
