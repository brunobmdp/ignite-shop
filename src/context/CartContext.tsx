import { priceFormatter } from "@/utils/formatter"
import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"


interface ProductsProps {
  id: string
  name: string
  price: number
  defaultPriceId: string
  imageUrl: string
  amount: number
}

interface CartProps {
  products: ProductsProps[]
  total: number
}

interface CartContextType {
  cart: CartProps
  AddNewItem: (product: ProductsProps) => void
  removeItemFromCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}


export default function CartProvider({ children }: CartProviderProps) {
  const localStorageKey = '@ignite-shop:cart-items-1.0.0'
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [cart, setCart] = useState<CartProps>({
    products: [],
    total: 0,
  })

  useEffect(() => {
    const localCart = localStorage.getItem(localStorageKey)
    if (localCart) {
      setCart(JSON.parse(localCart))
    }

  }, [])

  const router = useRouter()

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false)
    } else {
      const stateJSON = JSON.stringify(cart)
      localStorage.setItem(localStorageKey, stateJSON)
    }
  }, [cart, isFirstTime])

  function clearCart() {
    setCart({
      products: [],
      total: 0,
    })
  }

  function AddNewItem(product: ProductsProps) {
    if (!cart.products.find(cartProduct => product.id === cartProduct.id)) {
      console.log('Adicionou')
      setCart(state => {
        const products = [...state.products, product]
        const total = products.reduce((acc, item) => acc + item.price, 0)
        console.log({ products, total })
        return {
          products,
          total
        }
      })
      alert('Produto adicionado com sucesso')


    } else {
      console.log('Não adicionou')
      alert('Produto já esta no carrinho')
    }
    router.push('/')

  }

  function removeItemFromCart(productId: string) {
    const products = cart.products.filter(product => product.id !== productId)
    const total = cart.products.reduce(
      (acc, product) => product.id !== productId
        ? acc + product.price
        : acc
      , 0)

    console.log({ products, total })
    setCart({
      products,
      total
    })
  }

  return (
    <CartContext.Provider value={{ cart, AddNewItem, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}