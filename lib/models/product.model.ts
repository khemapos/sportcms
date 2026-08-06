import { Schema, model, models, Document } from 'mongoose'

export type SportType = 'football' | 'basketball' | 'tennis' | 'running' | 'fitness' | 'badminton' | 'other'
export type CategoryType = 'clothes' | 'shoes' | 'equipment' | 'accessories'

export interface IProduct extends Document {
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  sport: SportType
  category: CategoryType
  brand: string
  images: string[]
  sizes: string[]
  colors: string[]
  isFeatured: boolean
  isNewArrival: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be greater than or equal to 0'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    sport: {
      type: String,
      enum: ['football', 'basketball', 'tennis', 'running', 'fitness', 'badminton', 'other'],
      required: [true, 'Sport category is required'],
    },
    category: {
      type: String,
      enum: ['clothes', 'shoes', 'equipment', 'accessories'],
      required: [true, 'Category type is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Product = models.Product || model<IProduct>('Product', ProductSchema)
