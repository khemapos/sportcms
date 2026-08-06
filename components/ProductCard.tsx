'use client'

import React from 'react'
import { ProductItem } from '@/lib/seedData'
import { useTranslation } from '@/lib/i18n'
import { Eye, ShoppingCart, Edit3, Trash2, Check } from 'lucide-react'

interface ProductCardProps {
  product: ProductItem
  onQuickView: (product: ProductItem) => void
  onAddToCart: (product: ProductItem) => void
  onEdit?: (product: ProductItem) => void
  onDelete?: (product: ProductItem) => void
  isCmsMode: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onEdit,
  onDelete,
  isCmsMode,
}) => {
  const { t } = useTranslation()
  const [added, setAdded] = React.useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const sportColors: Record<string, string> = {
    football: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    basketball: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    tennis: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
    running: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    fitness: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    badminton: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    other: 'bg-muted text-muted-foreground border-border',
  }

  const sportBadgeClass = sportColors[product.sport] || sportColors.other

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl">
      {/* Image Container - Aspect ratio 4/3 */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/3] sm:aspect-square w-full cursor-pointer overflow-hidden bg-muted/40"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-extrabold uppercase backdrop-blur-md ${sportBadgeClass}`}>
            {product.sport}
          </span>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow-xs">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(product)
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-md transition-transform hover:scale-110 active:scale-95"
            title={t.quickView}
          >
            <Eye className="h-4 w-4" />
          </button>
          {isCmsMode && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(product)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-md transition-transform hover:scale-110 active:scale-95"
              title="Edit in CMS"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          )}
          {isCmsMode && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(product)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-md transition-transform hover:scale-110 active:scale-95"
              title="Delete Product"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content - Clean padding */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        {/* Brand & Stock */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <span className="font-bold uppercase tracking-wider text-emerald-500 truncate max-w-[65%]">
            {product.brand}
          </span>
          <span className={product.stock > 0 ? 'text-muted-foreground font-medium shrink-0' : 'text-rose-500 font-medium shrink-0'}>
            {product.stock > 0 ? `${product.stock} left` : t.outOfStock}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="mt-1 min-h-[2rem] cursor-pointer text-xs font-bold text-foreground line-clamp-2 transition-colors hover:text-emerald-500 sm:text-sm"
        >
          {product.name}
        </h3>

        {/* Single-Line Compact Size Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1 overflow-hidden whitespace-nowrap text-[9px]">
            <span className="max-w-[70%] truncate rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 font-mono text-muted-foreground">
              {product.sizes[0]}
            </span>
            {product.sizes.length > 1 && (
              <span className="shrink-0 text-[9px] text-muted-foreground font-medium">
                +{product.sizes.length - 1}
              </span>
            )}
          </div>
        )}

        {/* Price & Add Button Footer */}
        <div className="mt-auto flex items-center justify-between pt-2.5">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold text-foreground sm:text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock === 0
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
            }`}
          >
            {added ? (
              <>
                <Check className="h-3 w-3" />
                <span className="hidden sm:inline">{t.added}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3" />
                <span>{t.add}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
