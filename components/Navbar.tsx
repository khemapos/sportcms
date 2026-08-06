'use client'

import React, { useState } from 'react'
import { useTranslation, Language } from '@/lib/i18n'
import {
  ShoppingBag,
  Search,
  PlusCircle,
  Trophy,
  Shirt,
  Footprints,
  Flame,
  Sparkles,
  Globe,
  ChevronDown,
  X,
  Sliders,
} from 'lucide-react'

interface NavbarProps {
  activeSport: string
  setActiveSport: (sport: string) => void
  activeCategory: string
  setActiveCategory: (cat: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  cartCount: number
  onOpenCart: () => void
  onOpenAddProduct: () => void
  isCmsMode: boolean
  setIsCmsMode: (val: boolean) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSport,
  setActiveSport,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenAddProduct,
  isCmsMode,
  setIsCmsMode,
}) => {
  const { language, setLanguage, t } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'km', label: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  ]

  const sports = [
    { id: 'all', label: t.allSports, icon: Trophy },
    { id: 'football', label: t.football, icon: Flame },
    { id: 'basketball', label: t.basketball, icon: Sparkles },
    { id: 'tennis', label: t.tennis, icon: Trophy },
    { id: 'running', label: t.running, icon: Footprints },
    { id: 'fitness', label: t.fitness, icon: Shirt },
  ]

  const categories = [
    { id: 'all', label: t.allGear },
    { id: 'shoes', label: t.footwear },
    { id: 'clothes', label: t.clothes },
    { id: 'equipment', label: t.equipment },
    { id: 'accessories', label: t.accessories },
  ]

  const currentLangObj = languages.find((l) => l.id === language) || languages[0]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-3 py-1 text-center text-[10px] sm:text-xs font-semibold text-white shadow-inner overflow-hidden">
        <div className="mx-auto max-w-7xl truncate">{t.topBanner}</div>
      </div>

      {/* Main Header Row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6">
        {/* Logo - Single Line Always */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20 shrink-0 sm:h-10 sm:w-10">
            <Trophy className="h-4 w-4 stroke-[2.2] sm:h-6 sm:w-6" />
          </div>
          <span className="whitespace-nowrap bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-base font-black tracking-tight text-transparent sm:text-2xl">
            MK SPORT
          </span>
        </div>

        {/* Desktop Search Bar */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/60 bg-muted/40 py-2 pl-10 pr-4 text-sm transition-all focus:border-emerald-500 focus:bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              {t.clear}
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0 sm:gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden active:scale-95"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-[11px] font-bold text-foreground hover:border-emerald-500 transition-colors sm:px-3 sm:py-1.5 sm:text-xs"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="whitespace-nowrap">{currentLangObj.flag} {currentLangObj.id.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-2xl border border-border bg-card shadow-xl z-50 animate-in fade-in-50">
                {languages.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLanguage(l.id)
                      setLangOpen(false)
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                      language === l.id ? 'bg-emerald-500/10 text-emerald-500 font-bold' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop CMS Toggle */}
          <button
            onClick={() => setIsCmsMode(!isCmsMode)}
            className={`hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              isCmsMode
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current animate-pulse shrink-0" />
            <span>{isCmsMode ? t.cmsAdminActive : t.enableCmsAdmin}</span>
          </button>

          {/* Desktop Add Product Button */}
          <button
            onClick={onOpenAddProduct}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t.addProduct}</span>
          </button>

          {/* Mobile Admin & Options Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-foreground sm:hidden active:scale-95 ${
              isCmsMode ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-border bg-card'
            }`}
            title="Options & CMS"
          >
            <Sliders className="h-4 w-4" />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-background text-foreground transition-all hover:border-emerald-500 hover:text-emerald-500 active:scale-95 sm:h-10 sm:w-10"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-md shadow-emerald-500/40 sm:h-5 sm:w-5 sm:text-[11px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Input */}
      {showMobileSearch && (
        <div className="border-t border-border/60 bg-muted/30 px-3 py-2 md:hidden animate-in slide-in-from-top-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-1.5 pl-9 pr-8 text-xs text-foreground focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu & CMS Overlay Drawer */}
      {showMobileMenu && (
        <div className="border-t border-border bg-card p-4 space-y-3 sm:hidden animate-in slide-in-from-top-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-bold text-foreground">Mobile Menu & CMS Control</span>
            <button onClick={() => setShowMobileMenu(false)} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setIsCmsMode(!isCmsMode)
              }}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all ${
                isCmsMode ? 'bg-amber-500 text-white' : 'bg-muted text-foreground border border-border'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              {isCmsMode ? t.cmsAdminActive : t.enableCmsAdmin}
            </button>

            <button
              onClick={() => {
                onOpenAddProduct()
                setShowMobileMenu(false)
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2 px-3 text-xs font-bold text-white shadow-md"
            >
              <PlusCircle className="h-4 w-4" />
              {t.addProduct}
            </button>
          </div>
        </div>
      )}

      {/* Sports Navigation Bar - Single Line Horizontal Scroll */}
      <div className="border-t border-border/40 bg-muted/20 px-3 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
          {/* Sports Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap py-0.5">
            {sports.map((sport) => {
              const Icon = sport.icon
              const isActive = activeSport === sport.id
              return (
                <button
                  key={sport.id}
                  onClick={() => setActiveSport(sport.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{sport.label}</span>
                </button>
              )
            })}
          </div>

          {/* Category Filter Links - Single Line Horizontal Scroll */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none whitespace-nowrap text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-lg px-2.5 py-1 whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'font-bold text-emerald-500 underline underline-offset-4'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
