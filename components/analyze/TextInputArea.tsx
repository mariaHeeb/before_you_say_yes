'use client'

import { Textarea } from '@/components/ui/textarea'

type Props = { value: string; onChange: (v: string) => void }

export function TextInputArea({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Textarea
        placeholder="Paste or type the full offer text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-52 resize-y rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-800 placeholder:text-slate-300 transition-colors focus:border-indigo-300 focus:bg-white focus:ring-indigo-100"
      />
      {value && (
        <p className="absolute bottom-3 right-3 text-[10px] font-medium text-slate-300">
          {value.length.toLocaleString()} characters
        </p>
      )}
    </div>
  )
}
