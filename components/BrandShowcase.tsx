'use client'

import React from 'react'
import { useTranslation } from '@/lib/i18n'
import { ShieldCheck, Truck, RotateCcw, Zap } from 'lucide-react'

export const BrandShowcase: React.FC = () => {
  const { t } = useTranslation()
  const brands = ['NIKE', 'ADIDAS', 'PUMA', 'JORDAN', 'WILSON', 'ASICS', 'UNDER ARMOUR']

  return (
    <section className="space-y-6 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:rounded-3xl sm:p-10 sm:space-y-8">
      {/* Brands Bar */}
      <div className="text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground sm:text-[11px]">
          {t.authorizedDistributor}
        </span>
        <div className="mt-3 grid grid-cols-3 gap-3 items-center justify-center opacity-80 transition-all hover:grayscale-0 sm:mt-4 sm:flex sm:flex-wrap sm:gap-8 sm:opacity-75">
          {brands.map((b) => (
            <span
              key={b}
              className="text-xs font-black tracking-wider text-foreground hover:text-emerald-500 transition-colors sm:text-2xl sm:tracking-widest"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-3 border-t border-border/60 pt-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-card p-3 shadow-xs sm:rounded-2xl sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 sm:h-10 sm:w-10 sm:rounded-xl">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">{t.authentic}</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
              {t.authenticGearDesc}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-card p-3 shadow-xs sm:rounded-2xl sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500 sm:h-10 sm:w-10 sm:rounded-xl">
            <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">{t.freeShipping}</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
              {t.expressDeliveryDesc}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-card p-3 shadow-xs sm:rounded-2xl sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 sm:h-10 sm:w-10 sm:rounded-xl">
            <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">{t.returnsPolicy}</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
              {t.returnsDesc}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-card p-3 shadow-xs sm:rounded-2xl sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 sm:h-10 sm:w-10 sm:rounded-xl">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">Elysia & MongoDB Sync</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
              {t.syncDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
