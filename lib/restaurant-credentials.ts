import { getRestaurantById } from './restaurants'

export const restaurantCredentials = [
  { restaurantId: 'la-parrilla', user: 'restaurante01', password: 'MenuRest01.' },
  { restaurantId: 'sushi-nikkei', user: 'restaurante02', password: 'MenuRest02.' },
  { restaurantId: 'trattoria-luna', user: 'restaurante03', password: 'MenuRest03.' },
  { restaurantId: 'cafe-andino', user: 'restaurante04', password: 'MenuRest04.' },
  { restaurantId: 'burger-house', user: 'restaurante05', password: 'MenuRest05.' },
  { restaurantId: 'taco-real', user: 'restaurante06', password: 'MenuRest06.' },
  { restaurantId: 'mar-azul', user: 'restaurante07', password: 'MenuRest07.' },
  { restaurantId: 'verde-vivo', user: 'restaurante08', password: 'MenuRest08.' },
  { restaurantId: 'dulce-mesa', user: 'restaurante09', password: 'MenuRest09.' },
  { restaurantId: 'sabores-oriente', user: 'restaurante10', password: 'MenuRest10.' }
]

export function findRestaurantByCredentials(user: string, password: string) {
  const credential = restaurantCredentials.find((entry) => entry.user === user && entry.password === password)
  if (!credential) return null

  return { ...getRestaurantById(credential.restaurantId), user: credential.user }
}
