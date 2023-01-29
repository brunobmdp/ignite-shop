import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import axios from "axios"
import { useContext, useState } from "react"
import Head from "next/head"
import { CartContext } from "@/context/CartContext"
import { priceFormatter } from "@/utils/formatter"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {

  const { AddNewItem } = useContext(CartContext)
  const { isFallback, } = useRouter()


  if (isFallback) {
    return <h1>Loading ...</h1>
  }


  function handleAddToCart() {
    AddNewItem({
      id: product.id,
      name: product.name,
      price: product.price,
      defaultPriceId: product.defaultPriceId,
      imageUrl: product.imageUrl,
      amount: 1,
    })
  }

  const title = `${product.name} | Ignite Shop `

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormatter.format(product.price / 100)}</span>

          <p>{product.description}</p>
          <button onClick={handleAddToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NEhGK20hgr6rNY' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount!,
        imageUrl: product.images[0],
        defaultPriceId: price.id

      }
    },
    revalidate: 60 * 60 * 1,  //1 hour
  }
}