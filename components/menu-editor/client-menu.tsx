'use client'

import { useMemo, useState } from 'react'
import { MenuItem } from '@/lib/types'
import { useMenu } from '@/lib/menu-context'
import { Search, X } from 'lucide-react'

type LanguageCode = 'es' | 'en' | 'fr' | 'it' | 'zh' | 'ja' | 'hi'

const languages: { code: LanguageCode; flag: string; label: string }[] = [
  { code: 'es', flag: 'co', label: 'Español' },
  { code: 'en', flag: 'gb', label: 'English' },
  { code: 'fr', flag: 'fr', label: 'Français' },
  { code: 'it', flag: 'it', label: 'Italiano' },
  { code: 'zh', flag: 'cn', label: '中文' },
  { code: 'ja', flag: 'jp', label: '日本語' },
  { code: 'hi', flag: 'in', label: 'हिन्दी' }
]

const ui = {
  es: {
    digitalMenu: 'Menú digital',
    search: 'Buscar crepes, waffles o ingredientes',
    all: 'Todo',
    emptyTitle: 'No encontramos productos',
    emptyText: 'Prueba con otra búsqueda o categoría.',
    close: 'Cerrar',
    viewImage: 'Ver imagen grande'
  },
  en: {
    digitalMenu: 'Digital menu',
    search: 'Search crepes, waffles, or ingredients',
    all: 'All',
    emptyTitle: 'No products found',
    emptyText: 'Try another search or category.',
    close: 'Close',
    viewImage: 'View large image'
  },
  fr: {
    digitalMenu: 'Menu numérique',
    search: 'Rechercher des crêpes, gaufres ou ingrédients',
    all: 'Tout',
    emptyTitle: 'Aucun produit trouvé',
    emptyText: 'Essayez une autre recherche ou catégorie.',
    close: 'Fermer',
    viewImage: 'Voir la grande image'
  },
  it: {
    digitalMenu: 'Menu digitale',
    search: 'Cerca crêpes, waffle o ingredienti',
    all: 'Tutto',
    emptyTitle: 'Nessun prodotto trovato',
    emptyText: 'Prova un’altra ricerca o categoria.',
    close: 'Chiudi',
    viewImage: 'Vedi immagine grande'
  },
  zh: {
    digitalMenu: '电子菜单',
    search: '搜索可丽饼、华夫饼或配料',
    all: '全部',
    emptyTitle: '未找到产品',
    emptyText: '请尝试其他搜索或分类。',
    close: '关闭',
    viewImage: '查看大图'
  },
  ja: {
    digitalMenu: 'デジタルメニュー',
    search: 'クレープ、ワッフル、材料を検索',
    all: 'すべて',
    emptyTitle: '商品が見つかりません',
    emptyText: '別の検索語またはカテゴリを試してください。',
    close: '閉じる',
    viewImage: '画像を大きく表示'
  },
  hi: {
    digitalMenu: 'डिजिटल मेनू',
    search: 'क्रेप्स, वॉफल्स या सामग्री खोजें',
    all: 'सभी',
    emptyTitle: 'कोई उत्पाद नहीं मिला',
    emptyText: 'दूसरी खोज या श्रेणी आज़माएं।',
    close: 'बंद करें',
    viewImage: 'बड़ी तस्वीर देखें'
  }
}

const translations: Record<string, Partial<Record<LanguageCode, string>>> = {
  'Crepes & Waffles Interior': {
    en: 'Crepes & Waffles Interior',
    fr: 'Crepes & Waffles Intérieur',
    it: 'Crepes & Waffles Interno',
    zh: '室内可丽饼与华夫饼',
    ja: 'クレープ＆ワッフル インテリア',
    hi: 'क्रेप्स और वॉफल्स इंटीरियर'
  },
  'Menú digital editable con imágenes, precios y diseño propio': {
    en: 'Editable digital menu with images, prices, and custom design',
    fr: 'Menu numérique modifiable avec images, prix et design personnalisé',
    it: 'Menu digitale modificabile con immagini, prezzi e design personalizzato',
    zh: '可编辑的电子菜单，包含图片、价格和自定义设计',
    ja: '画像、価格、独自デザインを編集できるデジタルメニュー',
    hi: 'चित्रों, कीमतों और अपने डिज़ाइन वाला संपादन योग्य डिजिटल मेनू'
  },
  'Crepes Dulces': {
    en: 'Sweet Crepes',
    fr: 'Crêpes sucrées',
    it: 'Crêpes dolci',
    zh: '甜可丽饼',
    ja: 'スイートクレープ',
    hi: 'मीठे क्रेप्स'
  },
  Waffles: {
    en: 'Waffles',
    fr: 'Gaufres',
    it: 'Waffle',
    zh: '华夫饼',
    ja: 'ワッフル',
    hi: 'वॉफल्स'
  },
  'Crepes Salados': {
    en: 'Savory Crepes',
    fr: 'Crêpes salées',
    it: 'Crêpes salate',
    zh: '咸味可丽饼',
    ja: 'セイボリークレープ',
    hi: 'नमकीन क्रेप्स'
  },
  'Crepe de Nutella': {
    en: 'Nutella Crepe',
    fr: 'Crêpe au Nutella',
    it: 'Crêpe alla Nutella',
    zh: '榛子巧克力可丽饼',
    ja: 'ヌテラクレープ',
    hi: 'नुटेला क्रेप'
  },
  'Crepe relleno de Nutella, fresas frescas y crema batida.': {
    en: 'Crepe filled with Nutella, fresh strawberries, and whipped cream.',
    fr: 'Crêpe garnie de Nutella, fraises fraîches et crème fouettée.',
    it: 'Crêpe farcita con Nutella, fragole fresche e panna montata.',
    zh: '可丽饼内含榛子巧克力酱、新鲜草莓和打发奶油。',
    ja: 'ヌテラ、新鮮ないちご、ホイップクリーム入りのクレープ。',
    hi: 'नुटेला, ताज़ी स्ट्रॉबेरी और व्हिप्ड क्रीम से भरा क्रेप।'
  },
  'Crepe de Frutas': {
    en: 'Fruit Crepe',
    fr: 'Crêpe aux fruits',
    it: 'Crêpe alla frutta',
    zh: '水果可丽饼',
    ja: 'フルーツクレープ',
    hi: 'फ्रूट क्रेप'
  },
  'Mezcla de frutas de temporada, miel y helado de vainilla.': {
    en: 'Seasonal fruit mix with honey and vanilla ice cream.',
    fr: 'Mélange de fruits de saison, miel et glace à la vanille.',
    it: 'Mix di frutta di stagione, miele e gelato alla vaniglia.',
    zh: '时令水果、蜂蜜和香草冰淇淋。',
    ja: '季節のフルーツ、はちみつ、バニラアイスクリーム。',
    hi: 'मौसमी फलों, शहद और वेनिला आइसक्रीम का मिश्रण।'
  },
  'Crepe Banano Split': {
    en: 'Banana Split Crepe',
    fr: 'Crêpe banana split',
    it: 'Crêpe banana split',
    zh: '香蕉船可丽饼',
    ja: 'バナナスプリットクレープ',
    hi: 'बनाना स्प्लिट क्रेप'
  },
  'Banano, chocolate, helado y nueces caramelizadas.': {
    en: 'Banana, chocolate, ice cream, and caramelized nuts.',
    fr: 'Banane, chocolat, glace et noix caramélisées.',
    it: 'Banana, cioccolato, gelato e noci caramellate.',
    zh: '香蕉、巧克力、冰淇淋和焦糖坚果。',
    ja: 'バナナ、チョコレート、アイスクリーム、キャラメリゼナッツ。',
    hi: 'केला, चॉकलेट, आइसक्रीम और कैरामेलाइज़्ड नट्स।'
  },
  'Waffle Clásico': {
    en: 'Classic Waffle',
    fr: 'Gaufre classique',
    it: 'Waffle classico',
    zh: '经典华夫饼',
    ja: 'クラシックワッフル',
    hi: 'क्लासिक वॉफल'
  },
  'Waffle belga tradicional con mantequilla y miel de maple.': {
    en: 'Traditional Belgian waffle with butter and maple syrup.',
    fr: 'Gaufre belge traditionnelle avec beurre et sirop d’érable.',
    it: 'Waffle belga tradizionale con burro e sciroppo d’acero.',
    zh: '传统比利时华夫饼，配黄油和枫糖浆。',
    ja: 'バターとメープルシロップを添えた伝統的なベルギーワッフル。',
    hi: 'मक्खन और मेपल सिरप के साथ पारंपरिक बेल्जियन वॉफल।'
  },
  'Waffle con Helado': {
    en: 'Waffle with Ice Cream',
    fr: 'Gaufre avec glace',
    it: 'Waffle con gelato',
    zh: '冰淇淋华夫饼',
    ja: 'アイスクリームワッフル',
    hi: 'आइसक्रीम वॉफल'
  },
  'Waffle crujiente con dos bolas de helado y salsa de chocolate.': {
    en: 'Crispy waffle with two scoops of ice cream and chocolate sauce.',
    fr: 'Gaufre croustillante avec deux boules de glace et sauce au chocolat.',
    it: 'Waffle croccante con due palline di gelato e salsa al cioccolato.',
    zh: '酥脆华夫饼，配两球冰淇淋和巧克力酱。',
    ja: 'アイスクリーム2スクープとチョコレートソースのサクサクワッフル。',
    hi: 'दो स्कूप आइसक्रीम और चॉकलेट सॉस के साथ कुरकुरा वॉफल।'
  },
  'Crepe de Pollo': {
    en: 'Chicken Crepe',
    fr: 'Crêpe au poulet',
    it: 'Crêpe al pollo',
    zh: '鸡肉可丽饼',
    ja: 'チキンクレープ',
    hi: 'चिकन क्रेप'
  },
  'Pollo desmechado, champiñones y salsa bechamel.': {
    en: 'Shredded chicken, mushrooms, and béchamel sauce.',
    fr: 'Poulet effiloché, champignons et sauce béchamel.',
    it: 'Pollo sfilacciato, funghi e salsa besciamella.',
    zh: '手撕鸡肉、蘑菇和白酱。',
    ja: 'ほぐしチキン、マッシュルーム、ベシャメルソース。',
    hi: 'श्रेडेड चिकन, मशरूम और बेचमेल सॉस।'
  },
  'Crepe Caprese': {
    en: 'Caprese Crepe',
    fr: 'Crêpe caprese',
    it: 'Crêpe caprese',
    zh: '卡普雷塞可丽饼',
    ja: 'カプレーゼクレープ',
    hi: 'कैप्रेसे क्रेप'
  },
  'Tomate fresco, mozzarella, albahaca y reducción de balsámico.': {
    en: 'Fresh tomato, mozzarella, basil, and balsamic reduction.',
    fr: 'Tomate fraîche, mozzarella, basilic et réduction balsamique.',
    it: 'Pomodoro fresco, mozzarella, basilico e riduzione di balsamico.',
    zh: '新鲜番茄、马苏里拉、罗勒和香醋浓缩汁。',
    ja: 'フレッシュトマト、モッツァレラ、バジル、バルサミコリダクション。',
    hi: 'ताज़ा टमाटर, मोज़रेला, तुलसी और बाल्समिक रिडक्शन।'
  }
}

export function ClientMenu() {
  const { categories, style } = useMenu()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [language, setLanguage] = useState<LanguageCode>('es')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const text = ui[language]
  const logoUrl = style.logoUrl || '/logo.webp'

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return categories
      .filter((category) => activeCategory === 'all' || category.id === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (!normalizedQuery) return true
          return `${translate(item.name, language)} ${translate(item.description, language)}`.toLowerCase().includes(normalizedQuery)
        })
      }))
      .filter((category) => category.items.length > 0)
  }, [activeCategory, categories, language, query])

  return (
    <main className="min-h-screen" style={{ backgroundColor: style.backgroundColor, color: style.textColor, fontFamily: style.fontFamily }}>
      <section className="relative overflow-hidden px-4 py-8 text-white sm:py-10">
        <img src={style.heroImageUrl || '/placeholder.jpg'} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${style.primaryColor}f5, ${style.primaryColor}b8)` }} />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <img src={logoUrl} alt="Crepes & Waffles" className="h-14 w-14 rounded-full bg-white object-cover ring-2 ring-white/50" />
            <LanguagePicker language={language} onChange={setLanguage} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-sm">{text.digitalMenu}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{translate(style.headerText, language)}</h1>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a5b3e]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={text.search}
              className="h-11 w-full rounded-lg border border-[#e6d7c5] bg-white pl-10 pr-4 text-sm outline-none focus:border-[#d8b56d]"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <CategoryButton active={activeCategory === 'all'} label={text.all} onClick={() => setActiveCategory('all')} />
            {categories.map((category) => (
              <CategoryButton key={category.id} active={activeCategory === category.id} label={translate(category.name, language)} onClick={() => setActiveCategory(category.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-3 py-5 sm:px-4 sm:py-6">
        {visibleCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl" style={{ color: style.primaryColor }}>{translate(category.name, language)}</h2>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-lg border border-[#eadfce] bg-white text-left shadow-sm transition-transform active:scale-[0.99] sm:min-h-[310px]"
                  aria-label={`${text.viewImage}: ${translate(item.name, language)}`}
                >
                  <div className="aspect-square w-full shrink-0 overflow-hidden bg-[#faf7f1]">
                    <img src={item.image || '/placeholder.jpg'} alt={translate(item.name, language)} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="line-clamp-2 text-sm font-bold leading-tight sm:text-base" style={{ color: style.textColor }}>{translate(item.name, language)}</h3>
                      <p className="text-sm font-bold sm:text-base" style={{ color: style.priceColor }}>{formatPrice(item.price)}</p>
                    </div>
                    <p className="mt-1 line-clamp-3 text-xs leading-4 sm:text-sm sm:leading-5" style={{ color: style.secondaryColor }}>{translate(item.description, language)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {visibleCategories.length === 0 && (
          <div className="rounded-lg border border-[#eadfce] bg-white px-4 py-12 text-center">
            <p className="font-semibold">{text.emptyTitle}</p>
            <p className="mt-1 text-sm opacity-70">{text.emptyText}</p>
          </div>
        )}
      </section>

      {selectedItem && (
        <ProductModal item={selectedItem} language={language} closeLabel={text.close} onClose={() => setSelectedItem(null)} priceColor={style.priceColor} textColor={style.textColor} secondaryColor={style.secondaryColor} />
      )}

      <footer className="px-4 pb-5 pt-2 text-center text-[11px] text-[#8a5b3e]/45">
        desarrollado por tolentinosw · tolentinosftw@gmail.com
      </footer>
    </main>
  )
}

function ProductModal({
  item,
  language,
  closeLabel,
  onClose,
  priceColor,
  textColor,
  secondaryColor
}: {
  item: MenuItem
  language: LanguageCode
  closeLabel: string
  onClose: () => void
  priceColor: string
  textColor: string
  secondaryColor: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4" onClick={onClose}>
      <article className="max-h-[92vh] w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="relative bg-gray-100">
          <img src={item.image || '/placeholder.jpg'} alt={translate(item.name, language)} className="max-h-[58vh] w-full object-contain" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2f211b] shadow"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold leading-tight" style={{ color: textColor }}>{translate(item.name, language)}</h3>
            <p className="shrink-0 text-xl font-bold" style={{ color: priceColor }}>{formatPrice(item.price)}</p>
          </div>
          <p className="mt-3 leading-7" style={{ color: secondaryColor }}>{translate(item.description, language)}</p>
        </div>
      </article>
    </div>
  )
}

function LanguagePicker({ language, onChange }: { language: LanguageCode; onChange: (language: LanguageCode) => void }) {
  return (
    <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/15 p-1 backdrop-blur">
      {languages.map((item) => (
        <button
          key={item.code}
          onClick={() => onChange(item.code)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${language === item.code ? 'bg-white' : 'hover:bg-white/20'}`}
          title={item.label}
          aria-label={item.label}
        >
          <img
            src={`https://flagcdn.com/w40/${item.flag}.png`}
            srcSet={`https://flagcdn.com/w80/${item.flag}.png 2x`}
            alt={item.label}
            className="h-6 w-6 rounded-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

function CategoryButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
        active ? 'bg-[#7f271c] text-white' : 'bg-[#f4eadf] text-[#6c4a37] hover:bg-[#eadfce]'
      }`}
    >
      {label}
    </button>
  )
}

function translate(value: string, language: LanguageCode) {
  if (language === 'es') return value
  return translations[value]?.[language] ?? value
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price)
}
