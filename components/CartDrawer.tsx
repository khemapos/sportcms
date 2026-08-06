'use client'

import React, { useState } from 'react'
import { ProductItem } from '@/lib/seedData'
import { useTranslation } from '@/lib/i18n'
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react'

export interface CartItem {
  product: ProductItem
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, delta: number, size?: string, color?: string) => void
  onRemoveItem: (productId: string, size?: string, color?: string) => void
  onClearCart: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { t } = useTranslation()
  const [isCheckedOut, setIsCheckedOut] = useState(false)

  if (!isOpen) return null

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99
  const total = subtotal + shipping

  const handleCheckout = () => {
    setIsCheckedOut(true)
    setTimeout(() => {
      onClearCart()
      setIsCheckedOut(false)
      onClose()
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in-50">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-card shadow-2xl flex flex-col border-l border-border">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-extrabold text-foreground">{t.cartTitle}</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
                {items.reduce((acc, i) => acc + i.quantity, 0)} {t.itemsCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {isCheckedOut ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-xl font-black text-foreground">Order Placed Successfully!</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Thank you for shopping at MK Sport. Your sports gear is being prepared for express delivery!
              </p>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {subtotal > 0 && (
                <div className="bg-emerald-500/10 p-3 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {subtotal >= 100
                    ? t.unlockedFreeShipping
                    : t.addMoreForFreeShipping.replace('${amount}', (100 - subtotal).toFixed(2))}
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-border/60">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 stroke-1 text-muted-foreground/50" />
                    <p className="mt-3 text-sm font-semibold">{t.yourCartIsEmpty}</p>
                    <p className="text-xs text-muted-foreground">{t.cartEmptyDesc}</p>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div key={`${item.product.id || item.product._id}-${index}`} className="flex gap-4 pt-4 first:pt-0">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/30">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-foreground">
                            <h4 className="line-clamp-1">{item.product.name}</h4>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {item.product.brand}
                            {item.selectedColor ? ` • Color: ${item.selectedColor}` : ''}
                            {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                          </p>
                        </div>

                        {/* Quantity & Delete Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center rounded-lg border border-border bg-muted/40">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id || item.product._id || '', -1, item.selectedSize, item.selectedColor)}
                              className="px-2 py-0.5 text-xs font-bold text-muted-foreground hover:text-foreground"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id || item.product._id || '', 1, item.selectedSize, item.selectedColor)}
                              className="px-2 py-0.5 text-xs font-bold text-muted-foreground hover:text-foreground"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id || item.product._id || '', item.selectedSize, item.selectedColor)}
                            className="text-xs text-muted-foreground hover:text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {items.length > 0 && (
                <div className="border-t border-border p-4 sm:p-6 bg-muted/20 space-y-3">
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>{t.subtotal}</span>
                      <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.expressShipping}</span>
                      <span className="font-semibold text-foreground">
                        {shipping === 0 ? t.free : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border">
                      <span>{t.total}</span>
                      <span className="text-emerald-500">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 active:scale-98"
                  >
                    {t.proceedCheckout}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
