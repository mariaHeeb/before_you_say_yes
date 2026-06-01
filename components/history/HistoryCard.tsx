import Link from 'next/link'
import { FileText, MessageSquare, Calendar, ChevronRight, CheckCircle, XCircle } from 'lucide-react'

type Props = {
  id: string; title: string; sourceType: string
  fileName: string | null; recommendation: string; createdAt: string
}

export function HistoryCard({ id, title, sourceType, fileName, recommendation, createdAt }: Props) {
  const date = new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const isAccept = recommendation === 'ACCEPT'
  return (
    <Link href={`/history/${id}`} className="group block">
      <div className="surface-card surface-card-hover flex items-center gap-4 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-indigo-50">
          {sourceType === 'file'
            ? <FileText className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-indigo-500" />
            : <MessageSquare className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-indigo-500" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-slate-800 transition-colors group-hover:text-indigo-700">{title}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3 w-3" />{date}
            {fileName && <span className="truncate opacity-60">· {fileName}</span>}
          </p>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${
          isAccept ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'
        }`}>
          {isAccept ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {recommendation}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-400" />
      </div>
    </Link>
  )
}
