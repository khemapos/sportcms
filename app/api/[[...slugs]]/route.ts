import { Elysia, t } from 'elysia'
import { connectToDatabase } from '@/lib/mongoose'
import { Product } from '@/lib/models/product.model'
import mongoose from 'mongoose'

const app = new Elysia({ prefix: '/api' })
  .onBeforeHandle(async () => {
    try {
      await connectToDatabase()
    } catch (error) {
      console.error('Database connection error in Elysia route:', error)
    }
  })
  .get('/health', () => {
    return {
      status: 'ok',
      service: 'sportcms-api',
      timestamp: new Date().toISOString(),
    }
  })
  .get('/db-status', () => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
    const state = mongoose.connection.readyState
    return {
      connected: state === 1,
      state: states[state] || 'unknown',
      database: mongoose.connection.name || 'sportcms',
    }
  })
  // GET /api/products - list products with optional filtering by sport, category, brand, featured
  .get(
    '/products',
    async ({ query }) => {
      const filter: Record<string, unknown> = {}
      
      if (query.sport) filter.sport = query.sport
      if (query.category) filter.category = query.category
      if (query.brand) filter.brand = query.brand
      if (query.featured === 'true') filter.isFeatured = true

      const products = await Product.find(filter).sort({ createdAt: -1 }).limit(50)
      return {
        success: true,
        count: products.length,
        data: products,
      }
    },
    {
      query: t.Object({
        sport: t.Optional(t.String()),
        category: t.Optional(t.String()),
        brand: t.Optional(t.String()),
        featured: t.Optional(t.String()),
      }),
    }
  )
  // GET /api/products/:id - get single product detail
  .get('/products/:id', async ({ params, set }) => {
    try {
      const product = await Product.findById(params.id)
      if (!product) {
        set.status = 404
        return { success: false, error: 'Product not found' }
      }
      return { success: true, data: product }
    } catch {
      set.status = 400
      return { success: false, error: 'Invalid product ID' }
    }
  })
  // POST /api/products - create a new sports product (clothes, shoes, equipment, etc.)
  .post(
    '/products',
    async ({ body, set }) => {
      try {
        const product = await Product.create(body)
        set.status = 201
        return { success: true, data: product }
      } catch (err: unknown) {
        set.status = 400
        const message = err instanceof Error ? err.message : 'Failed to create product'
        return { success: false, error: message }
      }
    },
    {
      body: t.Object({
        name: t.String(),
        slug: t.String(),
        description: t.String(),
        price: t.Number(),
        originalPrice: t.Optional(t.Number()),
        stock: t.Number(),
        sport: t.Union([
          t.Literal('football'),
          t.Literal('basketball'),
          t.Literal('tennis'),
          t.Literal('running'),
          t.Literal('fitness'),
          t.Literal('badminton'),
          t.Literal('other'),
        ]),
        category: t.Union([
          t.Literal('clothes'),
          t.Literal('shoes'),
          t.Literal('equipment'),
          t.Literal('accessories'),
        ]),
        brand: t.String(),
        images: t.Optional(t.Array(t.String())),
        sizes: t.Optional(t.Array(t.String())),
        colors: t.Optional(t.Array(t.String())),
        isFeatured: t.Optional(t.Boolean()),
        isNewArrival: t.Optional(t.Boolean()),
      }),
    }
  )
  // DELETE /api/products/:id - delete product
  .delete('/products/:id', async ({ params, set }) => {
    try {
      const product = await Product.findByIdAndDelete(params.id)
      if (!product) {
        set.status = 404
        return { success: false, error: 'Product not found' }
      }
      return { success: true, message: 'Product deleted successfully' }
    } catch {
      set.status = 400
      return { success: false, error: 'Invalid product ID' }
    }
  })

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle
