'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Flame, Check } from 'lucide-react'

export const NewsletterSection: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white shadow-xl sm:p-12">
      <div className="relative z-10 mx-auto max-w-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase backdrop-blur-md">
          <Flame className="h-4 w-4 text-amber-300" />
          <span>{t.joinClub}</span>
        </div>

        <h2 className="text-2xl font-black tracking-tight sm:text-4xl">
          {t.newsletterTitle}
        </h2>

        <p className="text-xs text-slate-100 sm:text-sm">
          {t.newsletterDesc}
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.enterEmail}
            className="w-full rounded-full border border-white/30 bg-white/20 px-4 py-3 text-xs text-white placeholder:text-slate-200 focus:bg-white focus:text-slate-900 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform active:scale-95 hover:bg-slate-900"
          >
            {subscribed ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                {t.subscribed}
              </>
            ) : (
              t.subscribeNow
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
