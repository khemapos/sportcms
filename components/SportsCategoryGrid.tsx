'use client'

import React from 'react'
import { useTranslation } from '@/lib/i18n'
import { Flame, Trophy, Footprints, Shirt, Sparkles, ArrowRight } from 'lucide-react'

interface SportsCategoryGridProps {
  onSelectSport: (sport: string) => void
}

export const SportsCategoryGrid: React.FC<SportsCategoryGridProps> = ({ onSelectSport }) => {
  const { t } = useTranslation()

  const categories = [
    {
      id: 'football',
      name: `${t.football} ⚽`,
      tagline: 'Boots, Jerseys & Training Wear',
      count: '120+ Products',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1000&auto=format&fit=crop',
      color: 'from-emerald-600/90 to-teal-900/90',
      icon: Flame,
    },
    {
      id: 'basketball',
      name: `${t.basketball} 🏀`,
      tagline: 'Sneakers, Shorts & Court Gear',
      count: '85+ Products',
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop',
      color: 'from-amber-600/90 to-orange-950/90',
      icon: Sparkles,
    },
    {
      id: 'tennis',
      name: `${t.tennis} 🎾`,
      tagline: 'Rackets, Shoes & Accessories',
      count: '45+ Products',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop',
      color: 'from-lime-600/90 to-emerald-950/90',
      icon: Trophy,
    },
    {
      id: 'running',
      name: `${t.running} 🏃`,
      tagline: 'Marathon Shoes & Apparel',
      count: '90+ Products',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop',
      color: 'from-cyan-600/90 to-blue-950/90',
      icon: Footprints,
    },
    {
      id: 'fitness',
      name: `${t.fitness} 🏋️`,
      tagline: 'Gym Tees, Shorts & Accessories',
      count: '60+ Products',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      color: 'from-purple-600/90 to-indigo-950/90',
      icon: Shirt,
    },
  ]

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground sm:text-3xl">
            {t.shopBySport}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t.shopBySportDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <div
              key={cat.id}
              onClick={() => onSelectSport(cat.id)}
              className="group relative flex h-36 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-border/60 bg-muted/40 p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl sm:h-60 sm:rounded-3xl sm:p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-85 transition-opacity group-hover:opacity-90`} />

              {/* Top Badge */}
              <div className="absolute right-2.5 top-2.5 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px]">
                {cat.count}
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-0.5 text-white sm:space-y-1">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-emerald-400 shrink-0 sm:h-5 sm:w-5" />
                  <h3 className="text-sm font-black tracking-tight line-clamp-1 sm:text-xl">{cat.name}</h3>
                </div>
                <p className="text-[10px] text-slate-200 line-clamp-1 sm:text-xs">{cat.tagline}</p>
                
                <div className="hidden sm:flex items-center gap-1.5 pt-2 text-xs font-bold text-emerald-300 transition-all group-hover:translate-x-1">
                  <span>{t.exploreCollection}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
