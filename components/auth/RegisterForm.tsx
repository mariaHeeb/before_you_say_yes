'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { User, Mail, Lock } from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? 'Registration failed'); return }
      router.push('/analyze')
    } catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const inputClass = 'h-12 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-300 transition-colors focus:border-indigo-400 focus:ring-indigo-100'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
          Name <span className="font-normal text-slate-400">(optional)</span>
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            autoComplete="name" placeholder="Your name"
            className={cn(inputClass, 'pl-10')} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            required autoComplete="email" placeholder="you@example.com"
            className={cn(inputClass, 'pl-10')} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
          Password <span className="font-normal text-slate-400">(min 8 characters)</span>
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required autoComplete="new-password" placeholder="••••••••"
            className={cn(inputClass, 'pl-10')} />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className={cn('btn-cta w-full rounded-xl py-3.5 text-[15px]', loading && 'opacity-60 cursor-not-allowed')}>
        {loading ? (
          <span className="flex items-center justify-center gap-2.5">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating account...
          </span>
        ) : 'Create Free Account →'}
      </button>

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs text-slate-300">or</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </form>
  )
}
