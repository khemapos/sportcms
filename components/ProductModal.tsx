'use client'

import React, { useState, useEffect } from 'react'
import { ProductItem } from '@/lib/seedData'
import { useTranslation } from '@/lib/i18n'
import { X, Plus, Check } from 'lucide-react'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Partial<ProductItem>) => void
  initialProduct?: ProductItem | null
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(99.99)
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined)
  const [stock, setStock] = useState<number>(20)
  const [sport, setSport] = useState<ProductItem['sport']>('football')
  const [category, setCategory] = useState<ProductItem['category']>('shoes')
  const [brand, setBrand] = useState('Nike')
  const [imageUrl, setImageUrl] = useState('')
  const [sizes, setSizes] = useState<string[]>(['US 8', 'US 9', 'US 10'])
  const [newSize, setNewSize] = useState('')
  const [colors, setColors] = useState<string[]>(['Volt Yellow', 'Phantom Black'])
  const [newColor, setNewColor] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setSlug(initialProduct.slug)
      setDescription(initialProduct.description)
      setPrice(initialProduct.price)
      setOriginalPrice(initialProduct.originalPrice)
      setStock(initialProduct.stock)
      setSport(initialProduct.sport)
      setCategory(initialProduct.category)
      setBrand(initialProduct.brand)
      setImageUrl(initialProduct.images[0] || '')
      setSizes(initialProduct.sizes || [])
      setColors(initialProduct.colors || ['Standard'])
      setIsFeatured(initialProduct.isFeatured || false)
    } else {
      setName('')
      setSlug('')
      setDescription('')
      setPrice(99.99)
      setOriginalPrice(undefined)
      setStock(20)
      setSport('football')
      setCategory('shoes')
      setBrand('Nike')
      setImageUrl('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop')
      setSizes(['US 8', 'US 9', 'US 10', 'US 11'])
      setColors(['Volt Yellow', 'Phantom Black', 'White/Gold'])
      setIsFeatured(false)
    }
  }, [initialProduct, isOpen])

  if (!isOpen) return null

  const handleNameChange = (val: string) => {
    setName(val)
    if (!initialProduct) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const handleAddSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()])
      setNewSize('')
    }
  }

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((s) => s !== sizeToRemove))
  }

  const handleAddColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()])
      setNewColor('')
    }
  }

  const handleRemoveColor = (colToRemove: string) => {
    setColors(colors.filter((c) => c !== colToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      _id: initialProduct?._id || initialProduct?.id,
      id: initialProduct?.id,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      sport,
      category,
      brand,
      images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'],
      sizes,
      colors: colors.length > 0 ? colors : ['Standard'],
      isFeatured,
      isNewArrival: true,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-extrabold text-foreground">
          {initialProduct ? t.editProductTitle : t.createProductTitle}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
          {/* Product Name & Slug */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.productName} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Nike Mercurial Vapor 15"
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.urlSlug}</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="nike-mercurial-vapor-15"
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sport & Category & Brand */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.sportType} *</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as ProductItem['sport'])}
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              >
                <option value="football">{t.football} ⚽</option>
                <option value="basketball">{t.basketball} 🏀</option>
                <option value="tennis">{t.tennis} 🎾</option>
                <option value="running">{t.running} 🏃</option>
                <option value="fitness">{t.fitness} 🏋️</option>
                <option value="badminton">{t.badminton} 🏸</option>
                <option value="other">{t.otherSports} 🏆</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.category} *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductItem['category'])}
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              >
                <option value="shoes">{t.footwear}</option>
                <option value="clothes">{t.clothes}</option>
                <option value="equipment">{t.equipment}</option>
                <option value="accessories">{t.accessories}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.brandName} *</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Nike, Adidas, Wilson"
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Price, Original Price, Stock */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.salePrice} *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.originalPrice}</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">{t.inventoryStock} *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">{t.imageUrl}</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">{t.description} *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product technical details..."
              className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Color Options Tag Manager */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">Available Color Variants</label>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {colors.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-600 dark:text-teal-400"
                >
                  {c}
                  <button type="button" onClick={() => handleRemoveColor(c)} className="hover:text-rose-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="e.g. Volt Yellow, Phantom Black"
                className="w-48 rounded-xl border border-border bg-muted/30 px-3 py-1.5 text-xs text-foreground focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="flex items-center gap-1 rounded-xl bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/80"
              >
                <Plus className="h-3.5 w-3.5" /> Add Color
              </button>
            </div>
          </div>

          {/* Sizes Tag Manager */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">{t.availableSizes}</label>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {sizes.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500"
                >
                  {s}
                  <button type="button" onClick={() => handleRemoveSize(s)} className="hover:text-rose-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="e.g. US 10 or M"
                className="w-36 rounded-xl border border-border bg-muted/30 px-3 py-1.5 text-xs text-foreground focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="flex items-center gap-1 rounded-xl bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/80"
              >
                <Plus className="h-3.5 w-3.5" /> {t.addSize}
              </button>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="isFeatured" className="text-xs font-semibold text-foreground cursor-pointer">
              {t.featureOnFrontpage}
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 active:scale-95"
            >
              <Check className="h-4 w-4" />
              {initialProduct ? t.saveChanges : t.createProduct}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
