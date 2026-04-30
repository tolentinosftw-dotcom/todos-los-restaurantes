import en from './menu-translations/en.json'
import fr from './menu-translations/fr.json'
import hi from './menu-translations/hi.json'
import it from './menu-translations/it.json'
import ja from './menu-translations/ja.json'
import zh from './menu-translations/zh.json'

export type LanguageCode = 'es' | 'en' | 'fr' | 'it' | 'zh' | 'ja' | 'hi'

type TranslationFile = {
  ui: UiCopy
  categories: Record<string, string>
  products: Record<string, string>
  words: Record<string, string>
}

type UiCopy = {
  digitalMenu: string
  search: string
  all: string
  emptyTitle: string
  emptyText: string
  close: string
  viewImage: string
  favoritesTitle: string
  favoritesText: string
  favoritesTab: string
  ratingLabel: string
  pendingPrice: string
}

const esUi: UiCopy = {
  digitalMenu: 'Menu digital',
  search: 'Buscar productos o ingredientes',
  all: 'Todo',
  emptyTitle: 'No encontramos productos',
  emptyText: 'Prueba con otra busqueda o categoria.',
  close: 'Cerrar',
  viewImage: 'Ver imagen grande',
  favoritesTitle: 'Favoritos mejor valorados',
  favoritesText: 'Los productos que tus clientes marcaron con mas estrellas.',
  favoritesTab: 'Favoritos',
  ratingLabel: 'Calificar producto',
  pendingPrice: 'Precio pendiente'
}

const translationFiles: Partial<Record<LanguageCode, TranslationFile>> = {
  en,
  fr,
  it,
  zh,
  ja,
  hi
}

const translationIndexes = Object.fromEntries(
  Object.entries(translationFiles).map(([language, file]) => [language, buildTranslationIndex(file)])
) as Partial<Record<LanguageCode, Record<string, string>>>

export const languages: { code: LanguageCode; flag: string; label: string; locale: string; currency: string }[] = [
  { code: 'es', flag: '/flags/co.svg', label: 'Espanol', locale: 'es-CO', currency: 'COP' },
  { code: 'en', flag: '/flags/gb.svg', label: 'English', locale: 'en-US', currency: 'COP' }
]

export const uiCopy: Record<LanguageCode, UiCopy> = {
  es: esUi,
  en: en.ui,
  fr: fr.ui,
  it: it.ui,
  zh: zh.ui,
  ja: ja.ui,
  hi: hi.ui
}

const translationCache = new Map<string, string>()
const priceCache = new Map<string, string>()

export function translateText(value: string, language: LanguageCode) {
  if (language === 'es' || !value) return value

  const cacheKey = `${language}:${value}`
  const cached = translationCache.get(cacheKey)
  if (cached !== undefined) return cached

  const translatedValue = translateFromDictionary(value, language) || translateWords(value, language)
  translationCache.set(cacheKey, translatedValue)
  return translatedValue
}

export function formatMenuPrice(price: number, language: LanguageCode) {
  if (price <= 0) return uiCopy[language].pendingPrice

  const cacheKey = `${language}:${price}`
  const cached = priceCache.get(cacheKey)
  if (cached) return cached

  const languageConfig = languages.find((item) => item.code === language) ?? languages[0]
  const formattedPrice = new Intl.NumberFormat(languageConfig.locale, {
    style: 'currency',
    currency: languageConfig.currency,
    minimumFractionDigits: 0
  }).format(price)

  priceCache.set(cacheKey, formattedPrice)
  return formattedPrice
}

export function preloadMenuTranslations(values: string[]) {
  for (const language of languages) {
    if (language.code === 'es') continue
    for (const value of values) {
      translateText(value, language.code)
    }
  }
}

function translateFromDictionary(value: string, language: LanguageCode) {
  const index = translationIndexes[language]
  if (!index) return undefined
  return index[normalizeTextKey(value)]
}

function translateWords(value: string, language: LanguageCode) {
  const words = translationFiles[language]?.words
  if (!words) return value
  const textTokens = value.match(/\p{L}+/gu) ?? []
  const canTranslateEveryWord = textTokens.length > 0 && textTokens.every((word) => words[normalizeTextKey(word)])

  if (!canTranslateEveryWord) return value

  return value.replace(/\p{L}+/gu, (word) => {
    const translated = words[normalizeTextKey(word)]
    if (!translated) return word
    return isCapitalized(word) ? capitalize(translated) : translated
  })
}

function buildTranslationIndex(file: TranslationFile | undefined) {
  const index: Record<string, string> = {}
  if (!file) return index

  for (const group of [file.categories, file.products]) {
    for (const [key, value] of Object.entries(group)) {
      index[normalizeTextKey(key)] = value
    }
  }

  return index
}

function normalizeTextKey(value: string) {
  return repairMojibake(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function repairMojibake(value: string) {
  return value
    .replace(/Ã¡/g, 'a')
    .replace(/Ã©/g, 'e')
    .replace(/Ã­/g, 'i')
    .replace(/Ã³/g, 'o')
    .replace(/Ãº/g, 'u')
    .replace(/Ã±/g, 'n')
    .replace(/Ã¼/g, 'u')
    .replace(/Ã/g, 'A')
    .replace(/Ã‰/g, 'E')
    .replace(/Ã/g, 'I')
    .replace(/Ã“/g, 'O')
    .replace(/Ãš/g, 'U')
    .replace(/Ã‘/g, 'N')
}

function isCapitalized(value: string) {
  return value[0] === value[0]?.toUpperCase()
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
