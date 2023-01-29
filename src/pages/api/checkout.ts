import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface Request {
  products:{
    price:string,
    quantity: number,
  }[]
}

export default async function handle(req: NextApiRequest, res: NextApiResponse){
  const { products  } :Request = req.body 
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  
  if(req.method!== 'POST'){
    return res.status(405).json({error: 'Method not allowed'})
  }
  
  if(!products){
    return res.status(400).json({error: 'Price not found'})
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: products
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
    message: 'Compra realizada com sucesso',
  })
}