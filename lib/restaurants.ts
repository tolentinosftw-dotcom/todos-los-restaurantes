import { defaultMenuStyle, MenuCategory, MenuStyle } from './types'

export interface RestaurantProfile {
  id: string
  name: string
  logoUrl: string
  heroImageUrl: string
  style: MenuStyle
}

export interface RestaurantRecord extends RestaurantProfile {
  user: string
  password: string
  categories: MenuCategory[]
}

const baseStyle: MenuStyle = {
  ...defaultMenuStyle,
  headerSubtitle: '',
  headerSubtitleEn: ''
}

export const restaurantProfiles: RestaurantProfile[] = [
  createRestaurant('la-parrilla', 'La Parrilla', 'The Grill', '#8f2f23', '#7a4a2b', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('sushi-nikkei', 'Sushi Nikkei', 'Nikkei Sushi', '#1f6f78', '#4f6b67', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('trattoria-luna', 'Trattoria Luna', 'Luna Trattoria', '#2f7d4f', '#7b5f38', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('cafe-andino', 'Cafe Andino', 'Andean Coffee', '#7a3f28', '#6c5a44', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('burger-house', 'Burger House', 'Burger House', '#9a3c1f', '#5e4a3b', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('taco-real', 'Taco Real', 'Royal Taco', '#2f8f6b', '#805326', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('mar-azul', 'Mar Azul', 'Blue Sea', '#237c8f', '#386b75', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('verde-vivo', 'Verde Vivo', 'Living Green', '#4f8f3a', '#596f3b', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('dulce-mesa', 'Dulce Mesa', 'Sweet Table', '#9b4f7a', '#76506a', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=80'),
  createRestaurant('sabores-oriente', 'Sabores de Oriente', 'Eastern Flavors', '#6f4aa0', '#5c5578', '/placeholder-logo.png', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=80')
]

export const defaultRestaurant = restaurantProfiles[0]

export function getRestaurantById(id?: string | null) {
  if (!id) return defaultRestaurant
  return restaurantProfiles.find((restaurant) => restaurant.id === id) ?? defaultRestaurant
}

export function getRestaurantTemplateCategories(id?: string | null) {
  return cloneCategories(menuTemplates[id || defaultRestaurant.id] ?? menuTemplates[defaultRestaurant.id])
}

export function createRestaurant(
  id: string,
  name: string,
  nameEn: string,
  primaryColor: string,
  secondaryColor: string,
  logoUrl: string,
  heroImageUrl: string
): RestaurantProfile {
  return {
    id,
    name,
    logoUrl,
    heroImageUrl,
    style: {
      ...baseStyle,
      primaryColor,
      secondaryColor,
      priceColor: primaryColor,
      logoUrl,
      heroImageUrl,
      headerText: name,
      headerTextEn: nameEn
    }
  }
}

export function slugifyRestaurant(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `restaurante-${Date.now()}`
}

function cloneCategories(categories: MenuCategory[]) {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({ ...item }))
  }))
}

function item(id: string, name: string, nameEn: string, description: string, descriptionEn: string, price: number, image: string): Omit<MenuCategory['items'][number], 'category'> {
  return { id, name, nameEn, description, descriptionEn, price, image }
}

function category(id: string, name: string, nameEn: string, color: string, items: ReturnType<typeof item>[]): MenuCategory {
  return {
    id,
    name,
    nameEn,
    color,
    items: items.map((entry) => ({ ...entry, category: id }))
  }
}

const menuTemplates: Record<string, MenuCategory[]> = {
  'la-parrilla': [
    category('cortes', 'Cortes a la parrilla', 'Grilled cuts', '#8f2f23', [
      item('la-parrilla-bife', 'Bife de chorizo', 'Sirloin steak', 'Corte jugoso con chimichurri y papas rusticas.', 'Juicy cut with chimichurri and rustic potatoes.', 42000, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'),
      item('la-parrilla-costillas', 'Costillas BBQ', 'BBQ ribs', 'Costillas glaseadas, ensalada fresca y maiz asado.', 'Glazed ribs, fresh salad, and grilled corn.', 39000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80'),
      item('la-parrilla-pollo', 'Pollo carbonero', 'Charcoal chicken', 'Medio pollo marinado con hierbas y limon.', 'Half chicken marinated with herbs and lemon.', 32000, 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80')
    ]),
    category('acompanantes', 'Acompanantes', 'Sides', '#7a4a2b', [
      item('la-parrilla-papas', 'Papas criollas', 'Creole potatoes', 'Papas doradas con sal de la casa.', 'Golden potatoes with house salt.', 9000, 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=80'),
      item('la-parrilla-ensalada', 'Ensalada de la huerta', 'Garden salad', 'Hojas verdes, tomate, aguacate y vinagreta.', 'Greens, tomato, avocado, and vinaigrette.', 12000, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'sushi-nikkei': [
    category('rolls', 'Rollos especiales', 'Signature rolls', '#1f6f78', [
      item('sushi-nikkei-acevichado', 'Roll acevichado', 'Acevichado roll', 'Pescado blanco, aguacate y salsa acevichada.', 'White fish, avocado, and ceviche sauce.', 34000, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80'),
      item('sushi-nikkei-tempura', 'Tempura roll', 'Tempura roll', 'Langostino crocante, queso crema y salsa teriyaki.', 'Crispy prawn, cream cheese, and teriyaki sauce.', 36000, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80'),
      item('sushi-nikkei-salmon', 'Salmon spicy', 'Spicy salmon', 'Salmon, pepino, aguacate y mayo picante.', 'Salmon, cucumber, avocado, and spicy mayo.', 38000, 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80')
    ]),
    category('entradas', 'Entradas', 'Starters', '#4f6b67', [
      item('sushi-nikkei-gyozas', 'Gyozas de cerdo', 'Pork gyozas', 'Gyozas doradas con salsa ponzu.', 'Golden gyozas with ponzu sauce.', 21000, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'trattoria-luna': [
    category('pastas', 'Pastas', 'Pastas', '#2f7d4f', [
      item('trattoria-luna-carbonara', 'Spaghetti carbonara', 'Spaghetti carbonara', 'Panceta, parmesano y pimienta negra.', 'Pancetta, parmesan, and black pepper.', 31000, 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80'),
      item('trattoria-luna-pesto', 'Fettuccine al pesto', 'Fettuccine with pesto', 'Albahaca, nueces, parmesano y aceite de oliva.', 'Basil, nuts, parmesan, and olive oil.', 29000, 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80')
    ]),
    category('pizzas', 'Pizzas artesanales', 'Artisan pizzas', '#7b5f38', [
      item('trattoria-luna-margarita', 'Pizza margarita', 'Margherita pizza', 'Tomate, mozzarella fresca y albahaca.', 'Tomato, fresh mozzarella, and basil.', 33000, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80'),
      item('trattoria-luna-prosciutto', 'Pizza prosciutto', 'Prosciutto pizza', 'Prosciutto, rugula y parmesano.', 'Prosciutto, arugula, and parmesan.', 38000, 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'cafe-andino': [
    category('cafes', 'Cafe de origen', 'Origin coffee', '#7a3f28', [
      item('cafe-andino-filtrado', 'Cafe filtrado', 'Pour-over coffee', 'Preparacion manual con granos seleccionados.', 'Manual brew with selected beans.', 9000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'),
      item('cafe-andino-latte', 'Latte de la casa', 'House latte', 'Espresso doble con leche texturizada.', 'Double espresso with textured milk.', 11000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80')
    ]),
    category('panaderia', 'Panaderia', 'Bakery', '#6c5a44', [
      item('cafe-andino-croissant', 'Croissant de almendra', 'Almond croissant', 'Hojaldre horneado con crema de almendra.', 'Baked pastry with almond cream.', 12000, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'burger-house': [
    category('hamburguesas', 'Hamburguesas', 'Burgers', '#9a3c1f', [
      item('burger-house-clasica', 'Clasica House', 'House classic', 'Carne artesanal, cheddar, lechuga y salsa especial.', 'Craft patty, cheddar, lettuce, and special sauce.', 28000, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'),
      item('burger-house-doble', 'Doble queso', 'Double cheese', 'Doble carne, doble queso y cebolla caramelizada.', 'Double patty, double cheese, and caramelized onion.', 34000, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80')
    ]),
    category('bebidas', 'Bebidas', 'Drinks', '#5e4a3b', [
      item('burger-house-limonada', 'Limonada natural', 'Fresh lemonade', 'Limonada fresca con hierbabuena.', 'Fresh lemonade with mint.', 8000, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'taco-real': [
    category('tacos', 'Tacos', 'Tacos', '#2f8f6b', [
      item('taco-real-pastor', 'Tacos al pastor', 'Al pastor tacos', 'Cerdo adobado, pina, cilantro y cebolla.', 'Marinated pork, pineapple, cilantro, and onion.', 24000, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80'),
      item('taco-real-birria', 'Tacos de birria', 'Birria tacos', 'Carne suave con consome y queso.', 'Tender beef with consomme and cheese.', 28000, 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80')
    ]),
    category('antojos', 'Antojos', 'Cravings', '#805326', [
      item('taco-real-guacamole', 'Guacamole real', 'Royal guacamole', 'Aguacate, pico de gallo y totopos.', 'Avocado, pico de gallo, and tortilla chips.', 16000, 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'mar-azul': [
    category('pescados', 'Pescados', 'Fish', '#237c8f', [
      item('mar-azul-pargo', 'Pargo frito', 'Fried snapper', 'Pargo entero con arroz con coco y patacon.', 'Whole snapper with coconut rice and plantain.', 46000, 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=900&q=80'),
      item('mar-azul-salmon', 'Salmon a la plancha', 'Grilled salmon', 'Salmon con vegetales y salsa de limon.', 'Salmon with vegetables and lemon sauce.', 48000, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80')
    ]),
    category('ceviches', 'Ceviches', 'Ceviches', '#386b75', [
      item('mar-azul-ceviche', 'Ceviche mixto', 'Mixed ceviche', 'Mariscos, leche de tigre y crocante de maiz.', 'Seafood, tiger milk, and crispy corn.', 34000, 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'verde-vivo': [
    category('bowls', 'Bowls saludables', 'Healthy bowls', '#4f8f3a', [
      item('verde-vivo-quinoa', 'Bowl de quinoa', 'Quinoa bowl', 'Quinoa, garbanzos, aguacate y vegetales.', 'Quinoa, chickpeas, avocado, and vegetables.', 26000, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'),
      item('verde-vivo-proteina', 'Bowl proteico', 'Protein bowl', 'Arroz integral, tofu, edamame y ajonjoli.', 'Brown rice, tofu, edamame, and sesame.', 28000, 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80')
    ]),
    category('jugos', 'Jugos naturales', 'Fresh juices', '#596f3b', [
      item('verde-vivo-verde', 'Jugo verde', 'Green juice', 'Pepino, manzana, apio y limon.', 'Cucumber, apple, celery, and lemon.', 12000, 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'dulce-mesa': [
    category('postres', 'Postres', 'Desserts', '#9b4f7a', [
      item('dulce-mesa-cheesecake', 'Cheesecake de frutos rojos', 'Berry cheesecake', 'Cremoso cheesecake con salsa de frutos rojos.', 'Creamy cheesecake with berry sauce.', 18000, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80'),
      item('dulce-mesa-brownie', 'Brownie tibio', 'Warm brownie', 'Brownie con helado de vainilla.', 'Brownie with vanilla ice cream.', 16000, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80')
    ]),
    category('bebidas-dulces', 'Bebidas dulces', 'Sweet drinks', '#76506a', [
      item('dulce-mesa-malteada', 'Malteada de vainilla', 'Vanilla milkshake', 'Malteada cremosa con crema batida.', 'Creamy milkshake with whipped cream.', 14000, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80')
    ])
  ],
  'sabores-oriente': [
    category('wok', 'Wok y arroz', 'Wok and rice', '#6f4aa0', [
      item('sabores-oriente-pad-thai', 'Pad thai', 'Pad thai', 'Fideos de arroz, mani, vegetales y salsa tamarindo.', 'Rice noodles, peanuts, vegetables, and tamarind sauce.', 32000, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80'),
      item('sabores-oriente-arroz', 'Arroz cantones', 'Cantonese rice', 'Arroz salteado con vegetales, huevo y soya.', 'Fried rice with vegetables, egg, and soy.', 26000, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80')
    ]),
    category('dim-sum', 'Dim sum', 'Dim sum', '#5c5578', [
      item('sabores-oriente-bao', 'Bao de cerdo', 'Pork bao', 'Pan al vapor con cerdo glaseado.', 'Steamed bun with glazed pork.', 19000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80')
    ])
  ]
}
