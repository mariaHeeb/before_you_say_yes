'use client'

import { cn } from '@/lib/utils'

export type CharacterState = 'thinking' | 'accept' | 'decline'

const SKIN  = '#FAD7A0'
const HAIR  = '#374151'
const SHIRT = '#4F46E5'
const PANTS = '#1E293B'
const SHOE  = '#0F172A'

interface Props {
  state: CharacterState
  size?: number
  className?: string
}

export function CharacterAnimation({ state, size = 140, className }: Props) {
  const h = Math.round(size * 190 / 120)
  return (
    <div className={cn('flex items-end justify-center', className)}>
      <svg
        width={size}
        height={h}
        viewBox="0 0 120 190"
        style={{ overflow: 'visible' }}
        className={cn(
          state === 'thinking' && 'character-thinking',
          state === 'accept'   && 'character-accept',
          state === 'decline'  && 'character-decline',
        )}
      >
        {/* ── Thinking bubbles ───────────────────── */}
        {state === 'thinking' && (
          <g className="thinking-bubble">
            <circle cx="28" cy="48" r="4"  fill="#C7D2FE" />
            <circle cx="18" cy="36" r="6"  fill="#C7D2FE" />
            <circle cx="6"  cy="22" r="10" fill="#C7D2FE" />
            <text x="6" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4F46E5">...</text>
          </g>
        )}

        {/* ── Stars (accept) ─────────────────────── */}
        {state === 'accept' && (
          <>
            <text x="8"   y="42" fontSize="14" className="char-star-1">⭐</text>
            <text x="100" y="38" fontSize="11" className="char-star-2">✨</text>
            <text x="14"  y="78" fontSize="10" className="char-star-3">⭐</text>
            <text x="96"  y="80" fontSize="13" className="char-star-4">✨</text>
          </>
        )}

        {/* ── Question marks (decline) ───────────── */}
        {state === 'decline' && (
          <>
            <text x="100" y="44" fontSize="22" fontWeight="bold" fill="#4F46E5" className="char-q1">?</text>
            <text x="108" y="72" fontSize="14" fontWeight="bold" fill="#818CF8" className="char-q2">?</text>
          </>
        )}

        {/* ── Hair ───────────────────────────────── */}
        <ellipse cx="60" cy="32" rx="26" ry="16" fill={HAIR} />

        {/* ── Head ───────────────────────────────── */}
        <circle cx="60" cy="46" r="24" fill={SKIN} />

        {/* ── Eyes ───────────────────────────────── */}
        {state === 'thinking' && (
          <g>
            <circle cx="52" cy="43" r="3.5" fill={HAIR} />
            <circle cx="53.5" cy="41.5" r="1.3" fill="white" />
            {/* right eye looking up-right */}
            <circle cx="69" cy="41" r="3.5" fill={HAIR} />
            <circle cx="70.5" cy="39.5" r="1.3" fill="white" />
            {/* one raised eyebrow */}
            <path d="M 64 31 Q 69 28 74 31" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 46 33 Q 51 31 56 33" stroke={HAIR} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {state === 'accept' && (
          <g>
            {/* happy curved eyes */}
            <path d="M 48 44 Q 52 38 56 44" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 64 44 Q 68 38 72 44" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* eyebrows arched happy */}
            <path d="M 47 35 Q 52 31 57 34" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 63 34 Q 68 31 73 35" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {state === 'decline' && (
          <g>
            <circle cx="52" cy="44" r="3.5" fill={HAIR} />
            <circle cx="68" cy="44" r="3.5" fill={HAIR} />
            {/* skeptical: left brow raised, right brow furrowed */}
            <path d="M 46 33 Q 51 29 56 33" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 63 35 Q 68 33 73 36" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* ── Mouth ──────────────────────────────── */}
        {state === 'thinking' && (
          <path d="M 53 57 Q 60 60 67 57" stroke="#D4845A" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {state === 'accept' && (
          <path d="M 49 55 Q 60 66 71 55" stroke="#D4845A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {state === 'decline' && (
          <path d="M 53 59 Q 60 56 67 59" stroke="#D4845A" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* ── Neck ───────────────────────────────── */}
        <rect x="53" y="69" width="14" height="9" fill={SKIN} />

        {/* ── Shirt / torso ──────────────────────── */}
        <rect x="36" y="74" width="48" height="46" rx="10" fill={SHIRT} />

        {/* ── Arms ───────────────────────────────── */}

        {state === 'thinking' && (
          <g>
            {/* Left arm — relaxed down */}
            <path d="M 37 82 C 28 92 24 102 22 114"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="22" cy="116" r="9" fill={SKIN} />

            {/* Right arm — bent at elbow, hand near chin */}
            <path d="M 83 82 C 96 88 98 76 93 66"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M 93 66 C 90 58 78 56 70 59"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="68" cy="60" r="9" fill={SKIN} />
          </g>
        )}

        {state === 'accept' && (
          /* Clapping: both arms raised, hands come together */
          <g className="char-clap-group">
            {/* Left arm raised */}
            <path d="M 37 82 C 30 70 26 58 32 50"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="32" cy="47" r="9" fill={SKIN} className="char-hand-left" />

            {/* Right arm raised */}
            <path d="M 83 82 C 90 70 94 58 88 50"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="88" cy="47" r="9" fill={SKIN} className="char-hand-right" />
          </g>
        )}

        {state === 'decline' && (
          <g>
            {/* Left arm — on hip */}
            <path d="M 37 82 C 26 88 22 96 26 104"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="106" r="9" fill={SKIN} />

            {/* Right arm — raised, palm out (stop / skeptical) */}
            <path d="M 83 82 C 94 74 100 62 96 52"
              stroke={SHIRT} strokeWidth="14" fill="none" strokeLinecap="round" />
            {/* Open palm */}
            <circle cx="96" cy="50" r="11" fill={SKIN} />
            {/* Finger lines on palm */}
            <path d="M 90 44 L 90 38 M 95 43 L 96 37 M 100 44 L 102 38"
              stroke="#E8A26A" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ── Pants ──────────────────────────────── */}
        <rect x="36" y="116" width="19" height="44" rx="8" fill={PANTS} />
        <rect x="65" y="116" width="19" height="44" rx="8" fill={PANTS} />

        {/* ── Shoes ──────────────────────────────── */}
        <ellipse cx="45" cy="162" rx="16" ry="8" fill={SHOE} />
        <ellipse cx="75" cy="162" rx="16" ry="8" fill={SHOE} />
      </svg>
    </div>
  )
}
