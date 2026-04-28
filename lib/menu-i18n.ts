export type LanguageCode = 'es' | 'en' | 'fr' | 'it' | 'zh' | 'ja' | 'hi'

export const languages: { code: LanguageCode; emoji: string; label: string; locale: string; currency: string }[] = [
  { code: 'es', emoji: 'ES', label: 'Espanol', locale: 'es-CO', currency: 'COP' },
  { code: 'en', emoji: 'EN', label: 'English', locale: 'en-US', currency: 'COP' },
  { code: 'fr', emoji: 'FR', label: 'Francais', locale: 'fr-FR', currency: 'COP' },
  { code: 'it', emoji: 'IT', label: 'Italiano', locale: 'it-IT', currency: 'COP' },
  { code: 'zh', emoji: 'ZH', label: 'Chinese', locale: 'zh-CN', currency: 'COP' },
  { code: 'ja', emoji: 'JA', label: 'Japanese', locale: 'ja-JP', currency: 'COP' },
  { code: 'hi', emoji: 'HI', label: 'Hindi', locale: 'hi-IN', currency: 'COP' }
]

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

export const uiCopy: Record<LanguageCode, UiCopy> = {
  es: {
    digitalMenu: 'Menu digital',
    search: 'Buscar crepes, waffles o ingredientes',
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
  },
  en: {
    digitalMenu: 'Digital menu',
    search: 'Search crepes, waffles, or ingredients',
    all: 'All',
    emptyTitle: 'No products found',
    emptyText: 'Try another search or category.',
    close: 'Close',
    viewImage: 'View large image',
    favoritesTitle: 'Top-rated favorites',
    favoritesText: 'Products your customers marked with the most stars.',
    favoritesTab: 'Favorites',
    ratingLabel: 'Rate product',
    pendingPrice: 'Price pending'
  },
  fr: {
    digitalMenu: 'Menu numerique',
    search: 'Rechercher crepes, gaufres ou ingredients',
    all: 'Tout',
    emptyTitle: 'Aucun produit trouve',
    emptyText: 'Essayez une autre recherche ou categorie.',
    close: 'Fermer',
    viewImage: 'Voir la grande image',
    favoritesTitle: 'Favoris les mieux notes',
    favoritesText: 'Les produits les mieux notes par vos clients.',
    favoritesTab: 'Favoris',
    ratingLabel: 'Noter le produit',
    pendingPrice: 'Prix a definir'
  },
  it: {
    digitalMenu: 'Menu digitale',
    search: 'Cerca crepes, waffle o ingredienti',
    all: 'Tutto',
    emptyTitle: 'Nessun prodotto trovato',
    emptyText: 'Prova un altra ricerca o categoria.',
    close: 'Chiudi',
    viewImage: 'Vedi immagine grande',
    favoritesTitle: 'Preferiti piu votati',
    favoritesText: 'I prodotti che i clienti hanno valutato meglio.',
    favoritesTab: 'Preferiti',
    ratingLabel: 'Valuta prodotto',
    pendingPrice: 'Prezzo da definire'
  },
  zh: {
    digitalMenu: '\u6570\u5b57\u83dc\u5355',
    search: '\u641c\u7d22\u53ef\u4e3d\u997c\u3001\u534e\u592b\u997c\u6216\u914d\u6599',
    all: '\u5168\u90e8',
    emptyTitle: '\u672a\u627e\u5230\u4ea7\u54c1',
    emptyText: '\u8bf7\u5c1d\u8bd5\u5176\u4ed6\u641c\u7d22\u6216\u5206\u7c7b\u3002',
    close: '\u5173\u95ed',
    viewImage: '\u67e5\u770b\u5927\u56fe',
    favoritesTitle: '\u8bc4\u5206\u6700\u9ad8\u7684\u6700\u7231',
    favoritesText: '\u5ba2\u4eba\u8bc4\u5206\u6700\u9ad8\u7684\u4ea7\u54c1\u3002',
    favoritesTab: '\u6700\u7231',
    ratingLabel: '\u8bc4\u5206',
    pendingPrice: '\u4ef7\u683c\u5f85\u5b9a'
  },
  ja: {
    digitalMenu: '\u30c7\u30b8\u30bf\u30eb\u30e1\u30cb\u30e5\u30fc',
    search: '\u30af\u30ec\u30fc\u30d7\u3001\u30ef\u30c3\u30d5\u30eb\u3001\u6750\u6599\u3092\u691c\u7d22',
    all: '\u3059\u3079\u3066',
    emptyTitle: '\u5546\u54c1\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093',
    emptyText: '\u5225\u306e\u691c\u7d22\u307e\u305f\u306f\u30ab\u30c6\u30b4\u30ea\u30fc\u3092\u8a66\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    close: '\u9589\u3058\u308b',
    viewImage: '\u5927\u304d\u306a\u753b\u50cf\u3092\u898b\u308b',
    favoritesTitle: '\u9ad8\u8a55\u4fa1\u306e\u304a\u6c17\u306b\u5165\u308a',
    favoritesText: '\u304a\u5ba2\u69d8\u304c\u9ad8\u304f\u8a55\u4fa1\u3057\u305f\u5546\u54c1\u3002',
    favoritesTab: '\u304a\u6c17\u306b\u5165\u308a',
    ratingLabel: '\u8a55\u4fa1\u3059\u308b',
    pendingPrice: '\u4fa1\u683c\u672a\u5b9a'
  },
  hi: {
    digitalMenu: '\u0921\u093f\u091c\u093f\u091f\u0932 \u092e\u0947\u0928\u094d\u092f\u0942',
    search: '\u0915\u094d\u0930\u0947\u092a\u094d\u0938, \u0935\u093e\u092b\u0932 \u092f\u093e \u0938\u093e\u092e\u0917\u094d\u0930\u0940 \u0916\u094b\u091c\u0947\u0902',
    all: '\u0938\u092d\u0940',
    emptyTitle: '\u0915\u094b\u0908 \u0909\u0924\u094d\u092a\u093e\u0926 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e',
    emptyText: '\u0926\u0942\u0938\u0930\u0940 \u0916\u094b\u091c \u092f\u093e \u0936\u094d\u0930\u0947\u0923\u0940 \u0906\u091c\u092e\u093e\u090f\u0902\u0964',
    close: '\u092c\u0902\u0926 \u0915\u0930\u0947\u0902',
    viewImage: '\u092c\u0921\u093c\u0940 \u091b\u0935\u093f \u0926\u0947\u0916\u0947\u0902',
    favoritesTitle: '\u0938\u0930\u094d\u0935\u0936\u094d\u0930\u0947\u0937\u094d\u0920 \u0930\u0947\u091f\u0947\u0921 \u092a\u0938\u0902\u0926\u0940\u0926\u093e',
    favoritesText: '\u0917\u094d\u0930\u093e\u0939\u0915\u094b\u0902 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u0947 \u0930\u0947\u091f \u0915\u093f\u090f \u0917\u090f \u0909\u0924\u094d\u092a\u093e\u0926\u0964',
    favoritesTab: '\u092a\u0938\u0902\u0926\u0940\u0926\u093e',
    ratingLabel: '\u0930\u0947\u091f \u0915\u0930\u0947\u0902',
    pendingPrice: '\u092e\u0942\u0932\u094d\u092f \u092c\u093e\u0915\u0940'
  }
}

const phraseTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {
  en: {
    'Jugos y Batidos': 'Juices and Shakes',
    'Sopas y Entradas': 'Soups and Starters',
    Ensaladas: 'Salads',
    Bebidas: 'Drinks',
    'Especiales de Mar': 'Seafood Specials',
    Waffles: 'Waffles',
    'Crepes y Platos Salados': 'Savory Crepes and Plates',
    Mora: 'Blackberry',
    Mango: 'Mango',
    Fresa: 'Strawberry',
    Mandarina: 'Tangerine',
    Guanabana: 'Soursop',
    Feijoa: 'Feijoa'
  },
  fr: {
    'Jugos y Batidos': 'Jus et milk-shakes',
    'Sopas y Entradas': 'Soupes et entrees',
    Ensaladas: 'Salades',
    Bebidas: 'Boissons',
    'Especiales de Mar': 'Specialites de la mer',
    Waffles: 'Gaufres',
    'Crepes y Platos Salados': 'Crepes salees et plats',
    Mora: 'Mure',
    Mango: 'Mangue',
    Fresa: 'Fraise'
  },
  it: {
    'Jugos y Batidos': 'Succhi e frullati',
    'Sopas y Entradas': 'Zuppe e antipasti',
    Ensaladas: 'Insalate',
    Bebidas: 'Bevande',
    'Especiales de Mar': 'Specialita di mare',
    Waffles: 'Waffle',
    'Crepes y Platos Salados': 'Crepes salate e piatti'
  },
  zh: {
    'Jugos y Batidos': '\u679c\u6c41\u548c\u5976\u6614',
    'Sopas y Entradas': '\u6c64\u548c\u524d\u83dc',
    Ensaladas: '\u6c99\u62c9',
    Bebidas: '\u996e\u54c1',
    'Especiales de Mar': '\u6d77\u9c9c\u7279\u8272',
    Waffles: '\u534e\u592b\u997c',
    'Crepes y Platos Salados': '\u54b8\u53ef\u4e3d\u997c\u548c\u4e3b\u83dc'
  },
  ja: {
    'Jugos y Batidos': '\u30b8\u30e5\u30fc\u30b9\u3068\u30b7\u30a7\u30a4\u30af',
    'Sopas y Entradas': '\u30b9\u30fc\u30d7\u3068\u524d\u83dc',
    Ensaladas: '\u30b5\u30e9\u30c0',
    Bebidas: '\u30c9\u30ea\u30f3\u30af',
    'Especiales de Mar': '\u30b7\u30fc\u30d5\u30fc\u30c9\u30b9\u30da\u30b7\u30e3\u30eb',
    Waffles: '\u30ef\u30c3\u30d5\u30eb',
    'Crepes y Platos Salados': '\u5869\u5473\u30af\u30ec\u30fc\u30d7\u3068\u6599\u7406'
  },
  hi: {
    'Jugos y Batidos': '\u091c\u0942\u0938 \u0914\u0930 \u0936\u0947\u0915',
    'Sopas y Entradas': '\u0938\u0942\u092a \u0914\u0930 \u0938\u094d\u091f\u093e\u0930\u094d\u091f\u0930',
    Ensaladas: '\u0938\u0932\u093e\u0926',
    Bebidas: '\u092a\u0947\u092f',
    'Especiales de Mar': '\u0938\u0940\u092b\u0942\u0921 \u0938\u094d\u092a\u0947\u0936\u0932',
    Waffles: '\u0935\u093e\u092b\u0932',
    'Crepes y Platos Salados': '\u0928\u092e\u0915\u0940\u0928 \u0915\u094d\u0930\u0947\u092a\u094d\u0938 \u0914\u0930 \u0921\u093f\u0936'
  }
}

const wordTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {
  en: {
    jugo: 'juice',
    jugos: 'juices',
    batido: 'shake',
    batidos: 'shakes',
    sopa: 'soup',
    sopas: 'soups',
    entrada: 'starter',
    entradas: 'starters',
    ensalada: 'salad',
    ensaladas: 'salads',
    crepe: 'crepe',
    crepes: 'crepes',
    waffle: 'waffle',
    waffles: 'waffles',
    pollo: 'chicken',
    queso: 'cheese',
    champinones: 'mushrooms',
    chocolate: 'chocolate',
    helado: 'ice cream',
    agua: 'water',
    vino: 'wine',
    cerveza: 'beer',
    natural: 'natural',
    con: 'with',
    y: 'and',
    de: 'of'
  },
  fr: {
    jugo: 'jus',
    jugos: 'jus',
    batido: 'milk-shake',
    batidos: 'milk-shakes',
    sopa: 'soupe',
    sopas: 'soupes',
    entrada: 'entree',
    entradas: 'entrees',
    ensalada: 'salade',
    ensaladas: 'salades',
    crepe: 'crepe',
    crepes: 'crepes',
    waffle: 'gaufre',
    waffles: 'gaufres',
    pollo: 'poulet',
    queso: 'fromage',
    champinones: 'champignons',
    helado: 'glace',
    agua: 'eau',
    vino: 'vin',
    cerveza: 'biere',
    con: 'avec',
    y: 'et',
    de: 'de'
  },
  it: {
    jugo: 'succo',
    jugos: 'succhi',
    batido: 'frullato',
    batidos: 'frullati',
    sopa: 'zuppa',
    sopas: 'zuppe',
    entrada: 'antipasto',
    entradas: 'antipasti',
    ensalada: 'insalata',
    ensaladas: 'insalate',
    crepe: 'crepe',
    crepes: 'crepes',
    waffle: 'waffle',
    waffles: 'waffle',
    pollo: 'pollo',
    queso: 'formaggio',
    champinones: 'funghi',
    helado: 'gelato',
    agua: 'acqua',
    vino: 'vino',
    cerveza: 'birra',
    con: 'con',
    y: 'e',
    de: 'di'
  }
}

const translationCache = new Map<string, string>()
const priceCache = new Map<string, string>()

export function translateText(value: string, language: LanguageCode) {
  if (language === 'es' || !value) return value

  const cacheKey = `${language}:${value}`
  const cached = translationCache.get(cacheKey)
  if (cached !== undefined) return cached

  const phrase = phraseTranslations[language]?.[value]
  if (phrase) {
    translationCache.set(cacheKey, phrase)
    return phrase
  }

  const translatedValue = value.replace(/\p{L}+/gu, (word) => {
    const translated = wordTranslations[language]?.[normalizeToken(word)]
    if (!translated) return word
    return isCapitalized(word) ? capitalize(translated) : translated
  })

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

function normalizeToken(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function isCapitalized(value: string) {
  return value[0] === value[0]?.toUpperCase()
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
