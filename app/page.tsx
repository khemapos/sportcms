'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Navbar } from '@/components/Navbar'
import { HeroBanner } from '@/components/HeroBanner'
import { SportsCategoryGrid } from '@/components/SportsCategoryGrid'
import { ProductCard } from '@/components/ProductCard'
import { ProductModal } from '@/components/ProductModal'
import { ProductDetailModal } from '@/components/ProductDetailModal'
import { CartDrawer, CartItem } from '@/components/CartDrawer'
import { BrandShowcase } from '@/components/BrandShowcase'
import { NewsletterSection } from '@/components/NewsletterSection'
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/seedData'
import { Sparkles, SlidersHorizontal, PackageX, Database } from 'lucide-react'

export default function Page() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS)
  const [loading, setLoading] = useState<boolean>(true)
  const [dbConnected, setDbConnected] = useState<boolean>(false)

  // Filters & State
  const [activeSport, setActiveSport] = useState<string>('all')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured')
  const [isCmsMode, setIsCmsMode] = useState<boolean>(false)

  // Modals & Cart
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [selectedQuickView, setSelectedQuickView] = useState<ProductItem | null>(null)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load products from Elysia API (/api/products)
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)

      const res = await fetch('/api/products', { signal: controller.signal })
      clearTimeout(timeoutId)

      const data = await res.json()
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setProducts(data.data)
        setDbConnected(true)
      } else {
        setProducts(INITIAL_PRODUCTS)
      }
    } catch {
      setProducts(INITIAL_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Add to Cart Handler
  const handleAddToCart = (product: ProductItem, selectedSize?: string, selectedColor?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          (item.product.id || item.product._id) === (product.id || product._id) &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [...prev, { product, quantity: 1, selectedSize, selectedColor }]
    })
  }

  // Update Cart Item Quantity
  const handleUpdateQuantity = (productId: string, delta: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (
            (item.product.id || item.product._id) === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  // Remove Item from Cart
  const handleRemoveCartItem = (productId: string, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            (item.product.id || item.product._id) === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    )
  }

  // Create or Edit Product in CMS
  const handleSaveProduct = async (productData: Partial<ProductItem>) => {
    try {
      if (productData._id || productData.id) {
        setProducts((prev) =>
          prev.map((p) => ((p._id || p.id) === (productData._id || productData.id) ? ({ ...p, ...productData } as ProductItem) : p))
        )
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        })
        const data = await res.json()
        if (data.success && data.data) {
          setProducts((prev) => [data.data, ...prev])
        } else {
          const newProd: ProductItem = {
            ...productData,
            id: Date.now().toString(),
          } as ProductItem
          setProducts((prev) => [newProd, ...prev])
        }
      }
    } catch {
      const newProd: ProductItem = {
        ...productData,
        id: Date.now().toString(),
      } as ProductItem
      setProducts((prev) => [newProd, ...prev])
    }
  }

  // Delete Product in CMS
  const handleDeleteProduct = async (product: ProductItem) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return
    const id = product._id || product.id
    if (id) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' })
      } catch {
        // local fallback
      }
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id))
    }
  }

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeSport !== 'all' && p.sport.toLowerCase() !== activeSport.toLowerCase()) {
          return false
        }
        if (activeCategory !== 'all' && p.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase()
          const matchName = p.name.toLowerCase().includes(q)
          const matchBrand = p.brand.toLowerCase().includes(q)
          const matchDesc = p.description.toLowerCase().includes(q)
          return matchName || matchBrand || matchDesc
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'newest') return b.isNewArrival ? -1 : 1
        return b.isFeatured ? -1 : 1
      })
  }, [products, activeSport, activeCategory, searchQuery, sortBy])

  const scrollToProducts = () => {
    const el = document.getElementById('products-section')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeSport={activeSport}
        setActiveSport={(sport) => {
          setActiveSport(sport)
          scrollToProducts()
        }}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAddProduct={() => {
          setEditingProduct(null)
          setIsAddModalOpen(true)
        }}
        isCmsMode={isCmsMode}
        setIsCmsMode={setIsCmsMode}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-16">
        {/* Hero Section */}
        <HeroBanner
          onExploreClick={scrollToProducts}
          onCmsClick={() => setIsCmsMode(true)}
        />

        {/* Shop By Sports Category Grid */}
        <SportsCategoryGrid
          onSelectSport={(sport) => {
            setActiveSport(sport)
            scrollToProducts()
          }}
        />

        {/* Products Catalog Section */}
        <section id="products-section" className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {activeSport === 'all'
                    ? t.allSportsGear
                    : `${activeSport.toUpperCase()} COLLECTION`}
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-500">
                  {filteredProducts.length} {t.itemsCount}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.heroDesc}
              </p>
            </div>

            {/* Sort Dropdown & DB Status indicator */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground sm:flex">
                <Database className={`h-3.5 w-3.5 ${dbConnected ? 'text-emerald-500' : 'text-amber-500'}`} />
                <span>{dbConnected ? t.mongoConnected : t.localSeedData}</span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
                <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent font-medium text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="featured">{t.featuredFirst}</option>
                  <option value="price-asc">{t.priceLowHigh}</option>
                  <option value="price-desc">{t.priceHighLow}</option>
                  <option value="newest">{t.newArrivals}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="h-64 rounded-xl bg-muted/40 animate-pulse sm:h-80 sm:rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 text-center sm:rounded-3xl sm:p-12">
              <PackageX className="h-12 w-12 text-muted-foreground/40 stroke-1 sm:h-16 sm:w-16" />
              <h3 className="mt-4 text-sm font-bold text-foreground sm:text-base">{t.noProductsFound}</h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                {t.noProductsDesc}
              </p>
              <button
                onClick={() => {
                  setActiveSport('all')
                  setActiveCategory('all')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-600 transition-colors"
              >
                {t.resetFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id || product.slug}
                  product={product}
                  onQuickView={(p) => setSelectedQuickView(p)}
                  onAddToCart={handleAddToCart}
                  onEdit={(p) => {
                    setEditingProduct(p)
                    setIsAddModalOpen(true)
                  }}
                  onDelete={handleDeleteProduct}
                  isCmsMode={isCmsMode}
                />
              ))}
            </div>
          )}
        </section>

        {/* Brand Showcase Section */}
        <BrandShowcase />

        {/* Newsletter Promo Section */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/60 bg-muted/30 py-12 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                <span className="text-base font-black text-foreground">MK SPORT STORE</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.footerDesc}
              </p>
            </div>

            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-foreground">{t.shopBySport}</h4>
              <ul className="mt-3 space-y-2 text-xs">
                <li><button onClick={() => { setActiveSport('football'); scrollToProducts() }} className="hover:text-emerald-500">{t.football}</button></li>
                <li><button onClick={() => { setActiveSport('basketball'); scrollToProducts() }} className="hover:text-emerald-500">{t.basketball}</button></li>
                <li><button onClick={() => { setActiveSport('tennis'); scrollToProducts() }} className="hover:text-emerald-500">{t.tennis}</button></li>
                <li><button onClick={() => { setActiveSport('running'); scrollToProducts() }} className="hover:text-emerald-500">{t.running}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-foreground">{t.customerSupport}</h4>
              <ul className="mt-3 space-y-2 text-xs">
                <li className="hover:text-emerald-500 cursor-pointer">Order Tracking</li>
                <li className="hover:text-emerald-500 cursor-pointer">30-Day Return Policy</li>
                <li className="hover:text-emerald-500 cursor-pointer">Size Fitting Guide</li>
                <li className="hover:text-emerald-500 cursor-pointer">Authenticity Guarantee</li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-foreground">CMS & i18n Tech Stack</h4>
              <p className="mt-3 text-xs leading-relaxed">
                Powered by Next.js 16, ElysiaJS backend, Mongoose ODM, Tailwind CSS v4, and React I18n Context.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <span>© {new Date().getFullYear()} MK Sport Store & CMS. {t.allRightsReserved}</span>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
              <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      <ProductDetailModal
        product={selectedQuickView}
        isOpen={!!selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  )
}
