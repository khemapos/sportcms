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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in-50">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-md hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Gallery Left */}
          <div className="flex flex-col bg-muted/40 p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-background">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur-md">
                {product.sport} • {product.category}
              </span>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Right */}
          <div className="flex flex-col p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              {product.brand}
            </span>

            <h2 className="mt-1 text-xl font-black text-foreground sm:text-2xl">
              {product.name}
            </h2>

            {/* Rating & Stock */}
            <div className="mt-2 flex items-center gap-3 text-xs">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <span className="ml-1.5 font-bold text-foreground">4.9 (48 reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className={product.stock > 0 ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Color Options Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>Select Color</span>
                  <span className="text-muted-foreground text-[10px]">{product.colors.length} options</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color || (!selectedColor && color === product.colors[0])
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
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
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>Select Size</span>
                  <span className="text-muted-foreground text-[10px]">Standard fit</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size || (!selectedSize && size === product.sizes[0])
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
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

            {/* Delivery Highlights */}
            <div className="mt-5 space-y-1.5 rounded-2xl bg-muted/30 p-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Free express shipping & hassle-free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Guaranteed 100% authentic {product.brand} sports gear</span>
              </div>
            </div>

            {/* Add to Cart Action */}
            <div className="mt-auto pt-5">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all active:scale-98 ${
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
      </div>
    </div>
  )
}
