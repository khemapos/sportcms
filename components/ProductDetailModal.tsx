'use client'

import React, { useState } from 'react'
import { ProductItem } from '@/lib/seedData'
import { X, ShoppingBag, Truck, ShieldCheck, Check, Star } from 'lucide-react'

interface ProductDetailModalProps {
  product: ProductItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: ProductItem, selectedSize?: string, selectedColor?: string) => void
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [added, setAdded] = useState(false)

  if (!isOpen || !product) return null

  const handleAdd = () => {
    const size = selectedSize || (product.sizes.length > 0 ? product.sizes[0] : undefined)
    const color = selectedColor || (product.colors.length > 0 ? product.colors[0] : undefined)
    onAddToCart(product, size, color)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const images = product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop']

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-md animate-in fade-in-50 sm:items-center sm:p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-md hover:bg-black/80 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Gallery */}
            <div className="flex flex-col bg-muted/30 p-4 sm:p-6">
              <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-background">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px]">
                  {product.sport} • {product.category}
                </span>
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-16 sm:w-16 ${
                        selectedImage === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Options */}
            <div className="flex flex-col p-4 sm:p-8">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500 sm:text-xs">
                {product.brand}
              </span>

              <h2 className="mt-0.5 text-lg font-black text-foreground sm:text-2xl">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:gap-3">
                <div className="flex items-center text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 sm:h-4 sm:w-4" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 sm:h-4 sm:w-4" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 sm:h-4 sm:w-4" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 sm:h-4 sm:w-4" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 sm:h-4 sm:w-4" />
                  <span className="ml-1 text-[11px] font-bold text-foreground sm:text-xs">4.9 (48)</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className={`text-[11px] sm:text-xs ${product.stock > 0 ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-xl font-black text-foreground sm:text-2xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through sm:text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-xs">
                {product.description}
              </p>

              {/* Color Options Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground">
                    <span>Select Color</span>
                    <span className="text-[10px] text-muted-foreground">{product.colors.length} options</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor === color || (!selectedColor && color === product.colors[0])
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`rounded-xl border px-3 py-1 text-xs font-semibold transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-xs'
                              : 'border-border bg-muted/40 text-foreground hover:border-emerald-500/50'
                          }`}
                        >
                          {color}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground">
                    <span>Select Size</span>
                    <span className="text-[10px] text-muted-foreground">Standard fit</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size || (!selectedSize && size === product.sizes[0])
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-xl border px-3 py-1 text-xs font-extrabold transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-xs'
                              : 'border-border bg-muted/40 text-foreground hover:border-emerald-500/50'
                          }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Shipping Highlights */}
              <div className="mt-4 space-y-1.5 rounded-2xl bg-muted/30 p-3 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Free express shipping & hassle-free returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                  <span>Guaranteed 100% authentic {product.brand} sports gear</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar for Mobile & Desktop */}
        <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 p-3 backdrop-blur-md sm:p-4">
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition-all active:scale-98 sm:text-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock === 0
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart • ${product.price.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
