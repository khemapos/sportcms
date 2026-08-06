'use client'

import React from 'react'
import { ProductItem } from '@/lib/seedData'
import { useTranslation } from '@/lib/i18n'
import { Eye, ShoppingCart, Edit3, Trash2, Tag, Check } from 'lucide-react'

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
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl sm:rounded-2xl">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase backdrop-blur-md sm:px-2.5 sm:text-[10px] ${sportBadgeClass}`}>
            {product.sport}
          </span>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:px-2 sm:text-[10px]">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-250 group-hover:opacity-100 sm:gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
            title={t.quickView}
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          {isCmsMode && onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
              title="Edit in CMS"
            >
              <Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
          {isCmsMode && onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
              title="Delete Product"
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {/* Brand & Stock */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
          <span className="font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
            {product.brand}
          </span>
          <span className={product.stock > 0 ? 'text-emerald-500 font-medium shrink-0' : 'text-rose-500 font-medium shrink-0'}>
            {product.stock > 0 ? `${product.stock} ${t.inStock}` : t.outOfStock}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="mt-1 cursor-pointer text-xs font-bold text-card-foreground line-clamp-1 transition-colors hover:text-emerald-500 sm:text-sm sm:mt-1.5"
        >
          {product.name}
        </h3>

        {/* Description - Hidden on tiny mobile screens */}
        <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 hidden sm:line-clamp-2 sm:block">
          {product.description}
        </p>

        {/* Sizes Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 flex items-center gap-1 overflow-x-auto text-[9px] scrollbar-none sm:text-[10px]">
            <Tag className="h-2.5 w-2.5 text-muted-foreground shrink-0 sm:h-3 sm:w-3" />
            {product.sizes.slice(0, 3).map((size, idx) => (
              <span
                key={idx}
                className="rounded border border-border/80 bg-muted/40 px-1 py-0.2 font-mono text-muted-foreground sm:px-1.5 sm:py-0.5"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-muted-foreground">+{product.sizes.length - 3}</span>
            )}
          </div>
        )}

        {/* Price & Add to Cart Footer */}
        <div className="mt-auto flex items-center justify-between pt-2.5 sm:pt-4">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-foreground sm:text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all active:scale-95 sm:px-3.5 sm:py-1.5 sm:text-xs ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock === 0
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600'
            }`}
          >
            {added ? (
              <>
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">{t.added}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{t.add}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
