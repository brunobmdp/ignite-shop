import type { AppProps } from 'next/app'

import Header from '@/components/header'

import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import CartProvider from '@/context/CartContext'


globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (

    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>

  )
}
