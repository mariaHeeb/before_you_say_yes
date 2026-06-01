'use client'

import { useRef, useState } from 'react'
import { Upload, X, FileText, Image } from 'lucide-react'
import { cn } from '@/lib/utils'

const ACCEPTED = '.pdf,.docx,.txt,.jpg,.jpeg,.png,.webp'
const ACCEPTED_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain', 'image/jpeg', 'image/png', 'image/webp',
])
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

type Props = { file: File | null; onFileChange: (f: File | null) => void }

export function FileUploadZone({ file, onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(f: File) {
    if (!ACCEPTED_TYPES.has(f.type) && !f.name.endsWith('.docx')) return
    onFileChange(f)
  }

  const isImage = file && IMAGE_TYPES.has(file.type)

  return (
    <>
      <input ref={inputRef} type="file" accept={ACCEPTED} className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {file ? (
        <div className="flex items-center gap-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            {isImage
              ? <Image className="h-5 w-5 text-indigo-600" />
              : <FileText className="h-5 w-5 text-indigo-600" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB · Ready to analyze</p>
          </div>
          <button type="button" onClick={() => onFileChange(null)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragging(false)
            const f = e.dataTransfer.files[0]; if (f) handleFile(f)
          }}
          className={cn(
            'flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-dashed py-12 text-center transition-all duration-200',
            dragging
              ? 'border-indigo-400 bg-indigo-50'
              : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30',
          )}
        >
          <div className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl transition-colors',
            dragging ? 'bg-indigo-100' : 'bg-white shadow-sm shadow-slate-200',
          )}>
            <Upload className={cn('h-6 w-6 transition-colors', dragging ? 'text-indigo-600' : 'text-slate-400')} />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-slate-700">
              {dragging ? 'Drop it here' : (
                <>Drop a file or <span className="text-indigo-600">browse</span></>
              )}
            </p>
            <p className="mt-1.5 text-xs text-slate-400">
              PDF, DOCX, TXT, JPG, PNG, WEBP · Max 10 MB
            </p>
          </div>
        </button>
      )}
    </>
  )
}
