import { FileSearch } from 'lucide-react'

type Props = {
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <FileSearch className="h-5 w-5 text-slate-400" />
      </div>
      <div>
        <p className="font-semibold text-slate-700">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {action}
    </div>
  )
}
