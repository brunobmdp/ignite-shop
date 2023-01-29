import { ArrowSliderLeft, ArrowSliderRight, HomeContainer, Product } from "@/styles/pages/home"

import Image from "next/image"


import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import Head from "next/head"
import { CaretRight, Handbag } from "phosphor-react"
import { useContext, useState } from "react"
import { CartContext } from "@/context/CartContext"
import { priceFormatter } from "@/utils/formatter"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceId: string
  }[]
}


export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { AddNewItem } = useContext(CartContext)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: 0,
    mode: 'snap',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      origin: 0.1,
      perView: 2,
      spacing: 48,
    }
  })




  return (
    <>
      <Head>
        <title>
          Home | Ignite Shop
        </title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider" >

        {
          products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
                <Product
                  className="keen-slider__slide"
                >
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{priceFormatter.format(product.price / 100)}</span>
                    </div>
                    <button
                      onClick={() => AddNewItem({
                        amount: 1,
                        defaultPriceId: product.priceId,
                        id: product.id,
                        imageUrl: product.imageUrl,
                        name: product.name,
                        price: product.price
                      })}
                    >
                      <Handbag size={32} weight="bold" />
                    </button>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
        {loaded && instanceRef.current &&
          <>
            <ArrowSliderRight >
              {
                (currentSlide < instanceRef.current.track.details.slides.length - 1) &&

                <button
                  onClick={() => instanceRef.current?.next()}
                >
                  <CaretRight size={48} />
                </button>
              }
            </ArrowSliderRight>
            <ArrowSliderLeft >
              {
                currentSlide > 0 &&
                <button
                  onClick={() => instanceRef.current?.prev()}
                >
                  <CaretRight size={48} />
                </button>
              }
            </ArrowSliderLeft>
          </>
        }
      </HomeContainer>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      priceId: price.id,
      imageUrl: product.images[0],
    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 hours
  }
}