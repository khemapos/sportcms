'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'km'

export interface TranslationDictionary {
  topBanner: string
  cmsAdminActive: string
  enableCmsAdmin: string
  addProduct: string
  allSports: string
  football: string
  basketball: string
  tennis: string
  running: string
  fitness: string
  badminton: string
  otherSports: string
  allGear: string
  footwear: string
  clothes: string
  equipment: string
  accessories: string
  searchPlaceholder: string
  clear: string
  heroTagline: string
  heroTitle1: string
  heroTitle2: string
  heroDesc: string
  shopCollection: string
  manageInventory: string
  freeShipping: string
  authentic: string
  returnsPolicy: string
  shopBySport: string
  shopBySportDesc: string
  exploreCollection: string
  allSportsGear: string
  itemsCount: string
  featuredFirst: string
  priceLowHigh: string
  priceHighLow: string
  newArrivals: string
  mongoConnected: string
  localSeedData: string
  noProductsFound: string
  noProductsDesc: string
  resetFilters: string
  inStock: string
  outOfStock: string
  quickView: string
  add: string
  added: string
  cartTitle: string
  yourCartIsEmpty: string
  cartEmptyDesc: string
  subtotal: string
  expressShipping: string
  free: string
  total: string
  proceedCheckout: string
  unlockedFreeShipping: string
  addMoreForFreeShipping: string
  createProductTitle: string
  editProductTitle: string
  productName: string
  urlSlug: string
  sportType: string
  category: string
  brandName: string
  salePrice: string
  originalPrice: string
  inventoryStock: string
  imageUrl: string
  description: string
  availableSizes: string
  addSize: string
  featureOnFrontpage: string
  saveChanges: string
  createProduct: string
  cancel: string
  authorizedDistributor: string
  authenticGearDesc: string
  expressDeliveryDesc: string
  returnsDesc: string
  syncDesc: string
  joinClub: string
  newsletterTitle: string
  newsletterDesc: string
  enterEmail: string
  subscribeNow: string
  subscribed: string
  footerDesc: string
  customerSupport: string
  allRightsReserved: string
}

const dictionaries: Record<Language, TranslationDictionary> = {
  en: {
    topBanner: '⚡ FREE EXPRESS SHIPPING ON ALL ORDERS OVER $100 • AUTHENTIC FOOTBALL & BASKETBALL GEAR ⚡',
    cmsAdminActive: 'CMS Admin Active',
    enableCmsAdmin: 'Enable CMS Admin',
    addProduct: 'Add Product',
    allSports: 'All Sports',
    football: 'Football',
    basketball: 'Basketball',
    tennis: 'Tennis',
    running: 'Running',
    fitness: 'Fitness',
    badminton: 'Badminton',
    otherSports: 'Other Sports',
    allGear: 'All Gear',
    footwear: 'Footwear & Shoes 👟',
    clothes: 'Apparel & Clothes 👕',
    equipment: 'Equipment & Gear 🎒',
    accessories: 'Accessories 🧢',
    searchPlaceholder: 'Search football boots, basketball jerseys, tennis rackets...',
    clear: 'Clear',
    heroTagline: 'NEW 2024/25 SPORTS COLLECTION',
    heroTitle1: 'Unleash Your',
    heroTitle2: 'Athletic Performance',
    heroDesc: 'Discover top-tier boots, jerseys, sneakers, and equipment for Football, Basketball, Tennis, and Running. 100% original brands with instant CMS inventory sync.',
    shopCollection: 'Shop Collection',
    manageInventory: 'Manage Inventory (CMS)',
    freeShipping: 'Worldwide Shipping',
    authentic: '100% Authentic',
    returnsPolicy: '30-Day Free Returns',
    shopBySport: 'Shop By Sport',
    shopBySportDesc: 'Explore specialized footwear, clothing, and gear engineered for performance',
    exploreCollection: 'Explore Collection',
    allSportsGear: 'All Sports Clothes & Shoes',
    itemsCount: 'items',
    featuredFirst: 'Featured First',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    newArrivals: 'New Arrivals',
    mongoConnected: 'MongoDB Connected',
    localSeedData: 'Local Seed Data',
    noProductsFound: 'No Sports Items Found',
    noProductsDesc: "We couldn't find any items matching your filter criteria. Try resetting your sport or category selection.",
    resetFilters: 'Reset All Filters',
    inStock: 'in stock',
    outOfStock: 'Out of stock',
    quickView: 'Quick View',
    add: 'Add',
    added: 'Added',
    cartTitle: 'Your Cart',
    yourCartIsEmpty: 'Your cart is currently empty',
    cartEmptyDesc: 'Add football boots, jerseys, or tennis rackets to start',
    subtotal: 'Subtotal',
    expressShipping: 'Express Shipping',
    free: 'FREE',
    total: 'Total',
    proceedCheckout: 'Proceed to Checkout',
    unlockedFreeShipping: '🎉 You unlocked FREE Express Shipping!',
    addMoreForFreeShipping: 'Add ${amount} more for FREE shipping',
    createProductTitle: 'Create New Sports Product (CMS)',
    editProductTitle: 'Edit Sports Product (CMS)',
    productName: 'Product Name',
    urlSlug: 'URL Slug',
    sportType: 'Sport Type',
    category: 'Category',
    brandName: 'Brand Name',
    salePrice: 'Sale Price ($)',
    originalPrice: 'Original Price ($)',
    inventoryStock: 'Inventory Stock',
    imageUrl: 'Image URL',
    description: 'Description',
    availableSizes: 'Available Sizes',
    addSize: 'Add Size',
    featureOnFrontpage: 'Feature on Storefront Homepage',
    saveChanges: 'Save Changes',
    createProduct: 'Create Product',
    cancel: 'Cancel',
    authorizedDistributor: 'AUTHORIZED DISTRIBUTOR OF WORLD-CLASS BRANDS',
    authenticGearDesc: 'Directly sourced from official sports brand manufacturers.',
    expressDeliveryDesc: 'Free shipping on all orders over $100 with real-time tracking.',
    returnsDesc: 'Easy size exchanges and instant refund policy for sports equipment.',
    syncDesc: 'Real-time CMS stock synchronization for clothes, shoes, and gear.',
    joinClub: 'JOIN THE MK SPORT ATHLETE CLUB',
    newsletterTitle: 'Get 15% Off Your First Sports Gear Order',
    newsletterDesc: 'Subscribe to receive exclusive access to limited-edition football boots, basketball shoes, tennis racket drops, and VIP CMS discounts.',
    enterEmail: 'Enter your email address...',
    subscribeNow: 'Subscribe Now',
    subscribed: 'Subscribed!',
    footerDesc: 'Your destination for 100% authentic football boots, basketball shoes, tennis gear, and athletic apparel.',
    customerSupport: 'Customer Support',
    allRightsReserved: 'All rights reserved.',
  },
  km: {
    topBanner: '⚡ ដឹកជញ្ជូនរហ័សឥតគិតថ្លៃសម្រាប់ការកុម្ម៉ង់ចាប់ពី $100 • ទំនិញកីឡាបាល់ទាត់ និងបាល់បោះពិតៗ ⚡',
    cmsAdminActive: 'ប្រព័ន្ធគ្រប់គ្រង CMS សកម្ម',
    enableCmsAdmin: 'បើកប្រព័ន្ធ CMS',
    addProduct: 'បន្ថែមផលិតផល',
    allSports: 'កីឡាទាំងអស់',
    football: 'បាល់ទាត់',
    basketball: 'បាល់បោះ',
    tennis: 'វាយកូនបាល់',
    running: 'រត់ប្រណាំង',
    fitness: 'ហាត់ប្រាណ',
    badminton: 'វាយសី',
    otherSports: 'កីឡាផ្សេងទៀត',
    allGear: 'ទំនិញទាំងអស់',
    footwear: 'ស្បែកជើងកីឡា 👟',
    clothes: 'សម្លៀកបំពាក់កីឡា 👕',
    equipment: 'ឧបករណ៍កីឡា 🎒',
    accessories: 'គ្រឿងបន្លាស់ 🧢',
    searchPlaceholder: 'ស្វែងរកស្បែកជើងបាល់ទាត់ អាវបាល់បោះ វាយកូនបាល់...',
    clear: 'លុប',
    heroTagline: 'បណ្តុំកីឡាថ្មី 2024/25',
    heroTitle1: 'បង្កើនសមត្ថភាព',
    heroTitle2: 'កីឡារបស់អ្នក',
    heroDesc: 'ស្វែងរកស្បែកជើង អាវ និងឧបករណ៍កីឡាបាល់ទាត់ បាល់បោះ វាយកូនបាល់ និងរត់ប្រណាំង។ ទំនិញច្បាប់ដើម 100% ជាមួយការធ្វើបច្ចុប្បន្នភាពស្តុក CMS ភ្លាមៗ។',
    shopCollection: 'ទិញទំនិញឥឡូវនេះ',
    manageInventory: 'គ្រប់គ្រងស្តុក (CMS)',
    freeShipping: 'ដឹកជញ្ជូនជុំវិញពិភពលោក',
    authentic: 'ទំនិញសេរីពិត 100%',
    returnsPolicy: 'ដូរវិញឥតគិតថ្លៃ 30 ថ្ងៃ',
    shopBySport: 'ជ្រើសរើសតាមប្រភេទកីឡា',
    shopBySportDesc: 'ស្វែងរកស្បែកជើង ខោអាវ និងឧបករណ៍ដែលរចនាឡើងសម្រាប់បង្កើនល្បឿន និងសមត្ថភាព',
    exploreCollection: 'មើលទំនិញទាំងអស់',
    allSportsGear: 'ខោអាវ និងស្បែកជើងកីឡាទាំងអស់',
    itemsCount: 'មុខទំនិញ',
    featuredFirst: 'ទំនិញលេចធ្លោមុន',
    priceLowHigh: 'តម្លៃ៖ ទាប ទៅ ខ្ពស់',
    priceHighLow: 'តម្លៃ៖ ខ្ពស់ ទៅ ទាប',
    newArrivals: 'ទំនិញមកដល់ថ្មី',
    mongoConnected: 'បានភ្ជាប់ MongoDB',
    localSeedData: 'ទិន្នន័យគំរូក្នុងម៉ាស៊ីន',
    noProductsFound: 'មិនមានទំនិញកីឡាទេ',
    noProductsDesc: 'មិនមានទំនិញដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។ សូមសាកល្បងកំណត់តម្រងឡើងវិញ។',
    resetFilters: 'កំណត់តម្រងឡើងវិញ',
    inStock: 'មានក្នុងស្តុក',
    outOfStock: 'អស់ពីស្តុក',
    quickView: 'មើលលម្អិត',
    add: 'បន្ថែម',
    added: 'បានបន្ថែម',
    cartTitle: 'កន្ត្រកទំនិញ',
    yourCartIsEmpty: 'កន្ត្រកទំនិញរបស់អ្នកទទេ',
    cartEmptyDesc: 'សូមបន្ថែមស្បែកជើងបាល់ទាត់ អាវ ឬរ៉ាកែតដើម្បីចាប់ផ្តើម',
    subtotal: 'តម្លៃសរុបបណ្តោះអាសន្ន',
    expressShipping: 'ថ្លៃដឹកជញ្ជូនរហ័ស',
    free: 'ឥតគិតថ្លៃ',
    total: 'តម្លៃសរុប',
    proceedCheckout: 'បន្តទៅការទូទាត់ប្រាក់',
    unlockedFreeShipping: '🎉 អ្នកទទួលបានការដឹកជញ្ជូនរហ័សឥតគិតថ្លៃ!',
    addMoreForFreeShipping: 'បន្ថែម ${amount} ទៀតដើម្បីទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃ',
    createProductTitle: 'បង្កើតផលិតផលកីឡាថ្មី (CMS)',
    editProductTitle: 'កែប្រែផលិតផលកីឡា (CMS)',
    productName: 'ឈ្មោះផលិតផល',
    urlSlug: 'URL Slug',
    sportType: 'ប្រភេទកីឡា',
    category: 'ប្រភេទទំនិញ',
    brandName: 'ម៉ាកយីហោ',
    salePrice: 'តម្លៃលក់ ($)',
    originalPrice: 'តម្លៃដើម ($)',
    inventoryStock: 'ចំនួនស្តុក',
    imageUrl: 'តំណភ្ជាប់រូបភាព (URL)',
    description: 'ការពិពណ៌នា',
    availableSizes: 'ទំហំដែលមាន',
    addSize: 'បន្ថែមទំហំ',
    featureOnFrontpage: 'បង្ហាញលើទំព័រមុខ',
    saveChanges: 'រក្សាទុកការផ្លាស់ប្តូរ',
    createProduct: 'បង្កើតផលិតផល',
    cancel: 'បោះបង់',
    authorizedDistributor: 'តំណាងចែករំលែកផ្លូវការនៃម៉ាកយីហោល្បីៗលើពិភពលោក',
    authenticGearDesc: 'នាំចូលផ្ទាល់ពីក្រុមហ៊ុនផលិតម៉ាកយីហោកីឡាផ្លូវការ។',
    expressDeliveryDesc: 'ដឹកជញ្ជូនឥតគិតថ្លៃសម្រាប់ការកុម្ម៉ង់លើសពី $100 ជាមួយការតាមដានទំនិញ។',
    returnsDesc: 'ផ្លាស់ប្តូរទំហំងាយស្រួល និងគោលការណ៍សងប្រាក់វិញក្នុងរយៈពេល 30 ថ្ងៃ។',
    syncDesc: 'ការធ្វើបច្ចុប្បន្នភាពស្តុក CMS ភ្លាមៗសម្រាប់ខោអាវ និងស្បែកជើង។',
    joinClub: 'ចូលរួមជាមួយសមាជិកកីឡា MK SPORT',
    newsletterTitle: 'ទទួលបានការបញ្ចុះតម្លៃ 15% សម្រាប់ការកុម្ម៉ង់លើកដំបូង',
    newsletterDesc: 'ចុះឈ្មោះដើម្បីទទួលបានដំណឹងអំពីស្បែកជើងបាល់ទាត់ និងបាល់បោះសេរីថ្មីៗ។',
    enterEmail: 'បញ្ចូលអ៊ីមែលរបស់អ្នក...',
    subscribeNow: 'ចុះឈ្មោះឥឡូវនេះ',
    subscribed: 'បានចុះឈ្មោះ!',
    footerDesc: 'មជ្ឈមណ្ឌលស្បែកជើងបាល់ទាត់ អាវបាល់បោះ និងឧបករណ៍កីឡាពិតៗ 100%។',
    customerSupport: 'សេវាអតិថិជន',
    allRightsReserved: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationDictionary
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('sportx_lang') as Language
    if (savedLang && dictionaries[savedLang]) {
      setLanguage(savedLang)
      document.documentElement.setAttribute('data-lang', savedLang)
    } else {
      document.documentElement.setAttribute('data-lang', 'en')
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('sportx_lang', lang)
    document.documentElement.setAttribute('data-lang', lang)
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: dictionaries[language] || dictionaries.en,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}
