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

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg sm:rounded-2xl">
      {/* 1. Image Container */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full cursor-pointer overflow-hidden bg-muted/40"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-rose-500 px-1.5 py-0.2 text-[8px] font-extrabold text-white shadow-2xs sm:px-2 sm:text-[9px]">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 backdrop-blur-2xs transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(product)
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900 shadow-md transition-transform hover:scale-110 active:scale-95 sm:h-8 sm:w-8"
            title={t.quickView}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          {isCmsMode && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(product)
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-md transition-transform hover:scale-110 active:scale-95 sm:h-8 sm:w-8"
              title="Edit in CMS"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          )}
          {isCmsMode && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(product)
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white shadow-md transition-transform hover:scale-110 active:scale-95 sm:h-8 sm:w-8"
              title="Delete Product"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content - Only Name & Price */}
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        {/* 2. Short Name (Single Line Truncated) */}
        <h3
          onClick={() => onQuickView(product)}
          className="cursor-pointer text-[11px] font-bold text-foreground truncate transition-colors hover:text-emerald-500 sm:text-xs"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* 3. Price & Add Button Footer */}
        <div className="mt-2 flex items-center justify-between pt-1">
          <span className="text-xs font-extrabold text-foreground sm:text-sm">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-95 sm:h-8 sm:w-8 ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock === 0
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-emerald-500 text-white shadow-2xs hover:bg-emerald-600'
            }`}
            title={t.add}
          >
            {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
