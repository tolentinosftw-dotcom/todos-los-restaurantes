export type LanguageCode = 'es' | 'en' | 'fr' | 'it' | 'zh' | 'ja' | 'hi'

export const languages: { code: LanguageCode; flag: string; label: string; locale: string; currency: string }[] = [
  { code: 'es', flag: 'co', label: 'Español', locale: 'es-CO', currency: 'COP' },
  { code: 'en', flag: 'gb', label: 'English', locale: 'en-US', currency: 'COP' },
  { code: 'fr', flag: 'fr', label: 'Français', locale: 'fr-FR', currency: 'COP' },
  { code: 'it', flag: 'it', label: 'Italiano', locale: 'it-IT', currency: 'COP' },
  { code: 'zh', flag: 'cn', label: '中文', locale: 'zh-CN', currency: 'COP' },
  { code: 'ja', flag: 'jp', label: '日本語', locale: 'ja-JP', currency: 'COP' },
  { code: 'hi', flag: 'in', label: 'हिन्दी', locale: 'hi-IN', currency: 'COP' }
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
    digitalMenu: 'Menú digital',
    search: 'Buscar crepes, waffles o ingredientes',
    all: 'Todo',
    emptyTitle: 'No encontramos productos',
    emptyText: 'Prueba con otra búsqueda o categoría.',
    close: 'Cerrar',
    viewImage: 'Ver imagen grande',
    favoritesTitle: 'Favoritos mejor valorados',
    favoritesText: 'Los productos que tus clientes marcaron con más estrellas.',
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
    digitalMenu: 'Menu numérique',
    search: 'Rechercher crêpes, gaufres ou ingrédients',
    all: 'Tout',
    emptyTitle: 'Aucun produit trouvé',
    emptyText: 'Essayez une autre recherche ou catégorie.',
    close: 'Fermer',
    viewImage: 'Voir la grande image',
    favoritesTitle: 'Favoris les mieux notés',
    favoritesText: 'Les produits que vos clients ont le mieux notés.',
    favoritesTab: 'Favoris',
    ratingLabel: 'Noter le produit',
    pendingPrice: 'Prix à définir'
  },
  it: {
    digitalMenu: 'Menu digitale',
    search: 'Cerca crêpes, waffle o ingredienti',
    all: 'Tutto',
    emptyTitle: 'Nessun prodotto trovato',
    emptyText: 'Prova un altra ricerca o categoria.',
    close: 'Chiudi',
    viewImage: 'Vedi immagine grande',
    favoritesTitle: 'Preferiti più votati',
    favoritesText: 'I prodotti che i clienti hanno valutato meglio.',
    favoritesTab: 'Preferiti',
    ratingLabel: 'Valuta prodotto',
    pendingPrice: 'Prezzo da definire'
  },
  zh: {
    digitalMenu: '电子菜单',
    search: '搜索可丽饼、华夫饼或配料',
    all: '全部',
    emptyTitle: '未找到产品',
    emptyText: '请尝试其他搜索或分类。',
    close: '关闭',
    viewImage: '查看大图',
    favoritesTitle: '评分最高的收藏',
    favoritesText: '客户给出最多星级的产品。',
    favoritesTab: '收藏',
    ratingLabel: '评价产品',
    pendingPrice: '价格待定'
  },
  ja: {
    digitalMenu: 'デジタルメニュー',
    search: 'クレープ、ワッフル、材料を検索',
    all: 'すべて',
    emptyTitle: '商品が見つかりません',
    emptyText: '別の検索語またはカテゴリを試してください。',
    close: '閉じる',
    viewImage: '画像を大きく表示',
    favoritesTitle: '高評価のお気に入り',
    favoritesText: 'お客様が最も高く評価した商品。',
    favoritesTab: 'お気に入り',
    ratingLabel: '商品を評価',
    pendingPrice: '価格未設定'
  },
  hi: {
    digitalMenu: 'डिजिटल मेनू',
    search: 'क्रेप्स, वॉफल्स या सामग्री खोजें',
    all: 'सभी',
    emptyTitle: 'कोई उत्पाद नहीं मिला',
    emptyText: 'दूसरी खोज या श्रेणी आजमाएं।',
    close: 'बंद करें',
    viewImage: 'बड़ी तस्वीर देखें',
    favoritesTitle: 'सबसे पसंदीदा',
    favoritesText: 'जिन उत्पादों को ग्राहकों ने सबसे ज्यादा सितारे दिए।',
    favoritesTab: 'पसंदीदा',
    ratingLabel: 'उत्पाद को रेट करें',
    pendingPrice: 'कीमत बाकी'
  }
}

const phraseTranslations: Record<string, Partial<Record<LanguageCode, string>>> = {
  'Crepes & Waffles Interior': {
    en: 'Crepes & Waffles Interior',
    fr: 'Crepes & Waffles Intérieur',
    it: 'Crepes & Waffles Interno',
    zh: '室内可丽饼与华夫饼',
    ja: 'クレープ＆ワッフル インテリア',
    hi: 'क्रेप्स और वॉफल्स इंटीरियर'
  },
  'Jugos y Batidos': { en: 'Juices and Shakes', fr: 'Jus et Milk-shakes', it: 'Succhi e Frullati', zh: '果汁和奶昔', ja: 'ジュースとシェイク', hi: 'जूस और शेक' },
  'Sopas y Entradas': { en: 'Soups and Starters', fr: 'Soupes et Entrées', it: 'Zuppe e Antipasti', zh: '汤和开胃菜', ja: 'スープと前菜', hi: 'सूप और स्टार्टर' },
  Ensaladas: { en: 'Salads', fr: 'Salades', it: 'Insalate', zh: '沙拉', ja: 'サラダ', hi: 'सलाद' },
  Bebidas: { en: 'Drinks', fr: 'Boissons', it: 'Bevande', zh: '饮品', ja: 'ドリンク', hi: 'पेय' },
  'Especiales de Mar': { en: 'Seafood Specials', fr: 'Spécialités de la Mer', it: 'Specialità di Mare', zh: '海鲜特色', ja: 'シーフードスペシャル', hi: 'समुद्री विशेष' },
  Waffles: { en: 'Waffles', fr: 'Gaufres', it: 'Waffle', zh: '华夫饼', ja: 'ワッフル', hi: 'वॉफल्स' },
  'Crepes y Platos Salados': { en: 'Savory Crepes and Plates', fr: 'Crêpes et Plats Salés', it: 'Crêpes e Piatti Salati', zh: '咸味可丽饼和餐盘', ja: 'セイボリークレープと料理', hi: 'नमकीन क्रेप्स और व्यंजन' },
  Otros: { en: 'Other', fr: 'Autres', it: 'Altri', zh: '其他', ja: 'その他', hi: 'अन्य' },
  Mora: { en: 'Blackberry', fr: 'Mûre', it: 'Mora', zh: '黑莓', ja: 'ブラックベリー', hi: 'ब्लैकबेरी' },
  Mango: { en: 'Mango', fr: 'Mangue', it: 'Mango', zh: '芒果', ja: 'マンゴー', hi: 'आम' },
  Mandarina: { en: 'Tangerine', fr: 'Mandarine', it: 'Mandarino', zh: '橘子', ja: 'みかん', hi: 'संतरा' },
  Fresa: { en: 'Strawberry', fr: 'Fraise', it: 'Fragola', zh: '草莓', ja: 'いちご', hi: 'स्ट्रॉबेरी' },
  Guanábana: { en: 'Soursop', fr: 'Corossol', it: 'Guanabana', zh: '刺果番荔枝', ja: 'サワーソップ', hi: 'सीताफल जूस' },
  'Waffle Madame': { en: 'Madame Waffle', fr: 'Gaufre Madame', it: 'Waffle Madame', zh: '夫人华夫饼', ja: 'マダムワッフル', hi: 'मैडम वॉफल' },
  'Mini Waffle Dalí': { en: 'Mini Dali Waffle', fr: 'Mini Gaufre Dalí', it: 'Mini Waffle Dalí', zh: '迷你达利华夫饼', ja: 'ミニ ダリ ワッフル', hi: 'मिनी डाली वॉफल' }
}

const wordTranslations: Record<LanguageCode, Record<string, string>> = {
  es: {},
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
    champiñones: 'mushrooms',
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
    entrada: 'entrée',
    entradas: 'entrées',
    ensalada: 'salade',
    ensaladas: 'salades',
    crepe: 'crêpe',
    crepes: 'crêpes',
    waffle: 'gaufre',
    waffles: 'gaufres',
    pollo: 'poulet',
    queso: 'fromage',
    champiñones: 'champignons',
    helado: 'glace',
    agua: 'eau',
    vino: 'vin',
    cerveza: 'bière',
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
    crepe: 'crêpe',
    crepes: 'crêpes',
    waffle: 'waffle',
    waffles: 'waffle',
    pollo: 'pollo',
    queso: 'formaggio',
    champiñones: 'funghi',
    helado: 'gelato',
    agua: 'acqua',
    vino: 'vino',
    cerveza: 'birra',
    con: 'con',
    y: 'e',
    de: 'di'
  },
  zh: {
    jugo: '果汁',
    jugos: '果汁',
    batido: '奶昔',
    batidos: '奶昔',
    sopa: '汤',
    sopas: '汤',
    entrada: '开胃菜',
    entradas: '开胃菜',
    ensalada: '沙拉',
    ensaladas: '沙拉',
    crepe: '可丽饼',
    crepes: '可丽饼',
    waffle: '华夫饼',
    waffles: '华夫饼',
    pollo: '鸡肉',
    queso: '奶酪',
    champiñones: '蘑菇',
    helado: '冰淇淋',
    agua: '水',
    vino: '葡萄酒',
    cerveza: '啤酒',
    con: '配',
    y: '和',
    de: '的'
  },
  ja: {
    jugo: 'ジュース',
    jugos: 'ジュース',
    batido: 'シェイク',
    batidos: 'シェイク',
    sopa: 'スープ',
    sopas: 'スープ',
    entrada: '前菜',
    entradas: '前菜',
    ensalada: 'サラダ',
    ensaladas: 'サラダ',
    crepe: 'クレープ',
    crepes: 'クレープ',
    waffle: 'ワッフル',
    waffles: 'ワッフル',
    pollo: 'チキン',
    queso: 'チーズ',
    champiñones: 'マッシュルーム',
    helado: 'アイスクリーム',
    agua: '水',
    vino: 'ワイン',
    cerveza: 'ビール',
    con: '付き',
    y: 'と',
    de: 'の'
  },
  hi: {
    jugo: 'जूस',
    jugos: 'जूस',
    batido: 'शेक',
    batidos: 'शेक',
    sopa: 'सूप',
    sopas: 'सूप',
    entrada: 'स्टार्टर',
    entradas: 'स्टार्टर',
    ensalada: 'सलाद',
    ensaladas: 'सलाद',
    crepe: 'क्रेप',
    crepes: 'क्रेप्स',
    waffle: 'वॉफल',
    waffles: 'वॉफल्स',
    pollo: 'चिकन',
    queso: 'चीज',
    champiñones: 'मशरूम',
    helado: 'आइसक्रीम',
    agua: 'पानी',
    vino: 'वाइन',
    cerveza: 'बीयर',
    con: 'साथ',
    y: 'और',
    de: 'का'
  }
}

export function translateText(value: string, language: LanguageCode) {
  if (language === 'es' || !value) return value
  const phrase = phraseTranslations[value]?.[language]
  if (phrase) return phrase

  return value.replace(/\p{L}+/gu, (word) => {
    const translated = wordTranslations[language][word.toLowerCase()]
    if (!translated) return word
    return isCapitalized(word) ? capitalize(translated) : translated
  })
}

export function formatMenuPrice(price: number, language: LanguageCode) {
  if (price <= 0) return uiCopy[language].pendingPrice
  const languageConfig = languages.find((item) => item.code === language) ?? languages[0]

  return new Intl.NumberFormat(languageConfig.locale, {
    style: 'currency',
    currency: languageConfig.currency,
    minimumFractionDigits: 0
  }).format(price)
}

function isCapitalized(value: string) {
  return value[0] === value[0]?.toUpperCase()
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
