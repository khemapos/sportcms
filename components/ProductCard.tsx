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
    <div className="group flex flex-col transition-all duration-300">
      {/* 1. Clean Square Image Container */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-muted/40 shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[8px] font-black text-white shadow-xs sm:text-[9px]">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 opacity-0 backdrop-blur-2xs transition-opacity duration-200 group-hover:opacity-100">
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

      {/* 2. Text Details Below Image */}
      <div className="mt-2 flex flex-1 flex-col justify-between">
        {/* Title (2-Line Full Readability) */}
        <h3
          onClick={() => onQuickView(product)}
          className="cursor-pointer text-[11px] font-bold text-foreground line-clamp-2 leading-snug transition-colors hover:text-emerald-500 sm:text-xs"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Size Preview Row */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-1 flex items-center gap-1 overflow-hidden whitespace-nowrap text-[9px] text-muted-foreground">
            <span className="max-w-[75%] truncate rounded bg-muted/60 px-1 py-0.2 font-mono text-[9px]">
              {product.sizes[0]}
            </span>
            {product.sizes.length > 1 && (
              <span className="shrink-0 font-medium text-[9px]">
                +{product.sizes.length - 1}
              </span>
            )}
          </div>
        )}

        {/* Price & Add Button Row */}
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-extrabold text-foreground sm:text-sm">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[9px] text-muted-foreground line-through mt-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-95 sm:h-8 sm:w-8 ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock === 0
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
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
