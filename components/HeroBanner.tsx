'use client'

import React from 'react'
import { useTranslation } from '@/lib/i18n'
import { Flame, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react'

interface HeroBannerProps {
  onExploreClick: () => void
  onCmsClick: () => void
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onCmsClick }) => {
  const { t, language } = useTranslation()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-5 text-white shadow-2xl sm:rounded-3xl sm:p-10 md:p-12">
      {/* Background Glow Accents */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Text Content */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-7">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <Flame className="h-4 w-4 animate-bounce text-emerald-400 shrink-0" />
            <span className="truncate">{t.heroTagline}</span>
          </div>

          {/* Main Title - Dongrek Khmer styling */}
          <h1
            className={`tracking-tight text-white ${
              language === 'km'
                ? 'font-dongrek font-normal text-3xl sm:text-5xl lg:text-6xl leading-relaxed sm:leading-snug'
                : 'text-3xl font-extrabold sm:text-5xl lg:text-6xl leading-tight'
            }`}
          >
            <span>{t.heroTitle1} </span>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {t.heroTitle2}
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-xl text-xs leading-relaxed text-slate-300 sm:text-base">
            {t.heroDesc}
          </p>

          {/* Buttons Stack on Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1 sm:gap-4 sm:pt-2">
            <button
              onClick={onExploreClick}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 active:scale-95 sm:text-sm"
            >
              <span>{t.shopCollection}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <button
              onClick={onCmsClick}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-6 py-3 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-slate-700 active:scale-95 sm:text-sm"
            >
              <span>{t.manageInventory}</span>
            </button>
          </div>

          {/* Value Props Ticker */}
          <div className="grid grid-cols-1 gap-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300 sm:grid-cols-3 sm:gap-4 sm:pt-6">
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/40 p-2 sm:bg-transparent sm:p-0">
              <Truck className="h-4 w-4 text-emerald-400 shrink-0 sm:h-5 sm:w-5" />
              <span className="font-medium">{t.freeShipping}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/40 p-2 sm:bg-transparent sm:p-0">
              <ShieldCheck className="h-4 w-4 text-teal-400 shrink-0 sm:h-5 sm:w-5" />
              <span className="font-medium">{t.authentic}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/40 p-2 sm:bg-transparent sm:p-0">
              <RotateCcw className="h-4 w-4 text-cyan-400 shrink-0 sm:h-5 sm:w-5" />
              <span className="font-medium">{t.returnsPolicy}</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Grid preview (Desktop only) */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto max-w-sm rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl transition-all hover:border-emerald-500/40">
            <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                alt="Nike Mercurial Superfly"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
                FEATURED FOOTBALL
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-emerald-400">Nike Football</span>
                <span className="text-xs font-bold text-slate-400">In Stock: 24</span>
              </div>
              <h3 className="text-base font-bold text-white">Nike Mercurial Superfly 9 Elite</h3>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-white">$279.99</span>
                  <span className="text-xs text-slate-400 line-through">$299.99</span>
                </div>
                <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-bold text-emerald-400">
                  Save 7%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
