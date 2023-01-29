import { ImageContainer, ImagesList, SuccessContainer } from "@/styles/pages/success";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";

interface SuccessProps {
  customerName: string
  productImages: string[]
}

export default function Success({ customerName, productImages }: SuccessProps) {
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <>
          <title>
            Compra efetuada | Ignite Shop
          </title>
          <meta name="robots" content="noindex" />
        </>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImagesList>
          {
            productImages.map((image, i) => {
              return (
                <ImageContainer key={i}>
                  <Image
                    width={140}
                    height={140}
                    src={image} alt="" />
                </ImageContainer>
              )
            })
          }
        </ImagesList>
        {
          productImages.length < 2 ?
            <p>
              Uhuul <strong> {customerName} </strong>, sua camiseta já está a caminho da sua casa.
            </p>
            :
            <p>
              Uhuul <strong> {customerName} </strong>, suas <strong>{productImages.length}</strong> camisetas já está a caminho da sua casa.
            </p>
        }

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)


  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map(product => {
    return {
      product: product.price?.product as Stripe.Product
    }
  })!
  const productImages = products.map(item => {
    return item.product.images[0]
  })
  return {
    props: {
      customerName,
      productImages
    }
  }
}