import { promises as fs } from 'fs'
import path from 'path'
import { restaurantCredentials } from './restaurant-credentials'
import {
  createRestaurant,
  getRestaurantTemplateCategories,
  RestaurantRecord,
  restaurantProfiles,
  slugifyRestaurant
} from './restaurants'
import { MenuCategory, MenuStyle } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'restaurants.json')

export interface RestaurantInput {
  name: string
  nameEn?: string
  user: string
  password: string
  logoUrl?: string
  heroImageUrl?: string
}

export interface RestaurantUpdate {
  name?: string
  nameEn?: string
  user?: string
  password?: string
  logoUrl?: string
  heroImageUrl?: string
}

export interface MenuState {
  categories: MenuCategory[]
  style: MenuStyle
}

export async function getRestaurantRecords() {
  return readStore()
}

export async function getRestaurantRecord(id?: string | null) {
  const records = await readStore()
  if (!id) return records[0]
  return records.find((restaurant) => restaurant.id === id) ?? records[0]
}

export async function findStoredRestaurantByCredentials(user: string, password: string) {
  const records = await readStore()
  return records.find((restaurant) => restaurant.user === user && restaurant.password === password) ?? null
}

export async function createRestaurantRecord(input: RestaurantInput) {
  const records = await readStore()
  const baseId = slugifyRestaurant(input.name)
  const id = uniqueId(baseId, records.map((restaurant) => restaurant.id))
  const profile = createRestaurant(
    id,
    input.name,
    input.nameEn || input.name,
    '#263238',
    '#607d8b',
    input.logoUrl || '/placeholder-logo.png',
    input.heroImageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
  )
  const record: RestaurantRecord = {
    ...profile,
    user: input.user,
    password: input.password,
    categories: []
  }

  const nextRecords = [...records, record]
  await writeStore(nextRecords)
  return record
}

export async function updateRestaurantRecord(id: string, updates: RestaurantUpdate) {
  const records = await readStore()
  let updated: RestaurantRecord | null = null

  const nextRecords = records.map((restaurant) => {
    if (restaurant.id !== id) return restaurant

    const nextStyle = {
      ...restaurant.style,
      headerText: updates.name ?? restaurant.style.headerText,
      headerTextEn: updates.nameEn ?? restaurant.style.headerTextEn,
      logoUrl: updates.logoUrl ?? restaurant.logoUrl,
      heroImageUrl: updates.heroImageUrl ?? restaurant.heroImageUrl
    }

    updated = {
      ...restaurant,
      name: updates.name ?? restaurant.name,
      user: updates.user ?? restaurant.user,
      password: updates.password ?? restaurant.password,
      logoUrl: updates.logoUrl ?? restaurant.logoUrl,
      heroImageUrl: updates.heroImageUrl ?? restaurant.heroImageUrl,
      style: nextStyle
    }

    return updated
  })

  if (!updated) return null

  await writeStore(nextRecords)
  return updated
}

export async function saveRestaurantMenu(id: string, menu: MenuState) {
  const records = await readStore()
  let updated: RestaurantRecord | null = null

  const nextRecords = records.map((restaurant) => {
    if (restaurant.id !== id) return restaurant

    updated = {
      ...restaurant,
      name: menu.style.headerText || restaurant.name,
      logoUrl: menu.style.logoUrl || restaurant.logoUrl,
      heroImageUrl: menu.style.heroImageUrl || restaurant.heroImageUrl,
      style: menu.style,
      categories: menu.categories
    }

    return updated
  })

  if (!updated) return null

  await writeStore(nextRecords)
  return updated
}

async function readStore(): Promise<RestaurantRecord[]> {
  await ensureStore()
  const raw = await fs.readFile(DATA_FILE, 'utf8')
  const parsed = JSON.parse(raw) as RestaurantRecord[]
  return parsed
}

async function ensureStore() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await writeStore(buildInitialRecords())
  }
}

async function writeStore(records: RestaurantRecord[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf8')
}

function buildInitialRecords(): RestaurantRecord[] {
  return restaurantProfiles.map((profile, index) => {
    const credential = restaurantCredentials[index] ?? {
      restaurantId: profile.id,
      user: `restaurante${String(index + 1).padStart(2, '0')}`,
      password: `MenuRest${String(index + 1).padStart(2, '0')}.`
    }

    return {
      ...profile,
      user: credential.user,
      password: credential.password,
      categories: getRestaurantTemplateCategories(profile.id)
    }
  })
}

function uniqueId(baseId: string, existingIds: string[]) {
  let id = baseId
  let suffix = 2

  while (existingIds.includes(id)) {
    id = `${baseId}-${suffix}`
    suffix += 1
  }

  return id
}
