import {
  BillingInfo,
  CartItem,
  CartItemsList,
  CloseButton,
  Content,
  ImageContainer,
  ItemInfo,
  Overlay
} from '@/styles/pages/CartItemsModal';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from 'phosphor-react';

import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { priceFormatter } from '@/utils/formatter';
import axios from 'axios';


export default function CartItemsModal() {
  const { cart, removeItemFromCart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)

  async function handleBuyProduct() {

    try {
      setIsLoading(true)
      const products = cart.products.map(product => {
        return {
          price: product.defaultPriceId,
          quantity: 1
        }
      })
      const response = await axios.post('/api/checkout', {
        products
      })
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl //rotas externas
    } catch (err) {
      console.log({ Error: err })
      alert('Falha ao redirecionar ou checkout, favor tente mais tarde')

    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title >
          Sacola de compras
        </Dialog.Title>
        <CloseButton>
          <X weight='bold' size={24} />
        </CloseButton>

        <CartItemsList>
          {
            cart.products.map(product => {
              return (
                <CartItem key={product.id}>
                  <ImageContainer>
                    <Image src={product.imageUrl} alt="" height={95} width={95} />
                  </ImageContainer>
                  <ItemInfo>
                    <p>
                      {product.name}
                      <strong>{priceFormatter.format(product.price / 100)}</strong>
                    </p>
                    <span onClick={() => removeItemFromCart(product.id)}>
                      Remover
                    </span>
                  </ItemInfo>
                </CartItem>
              )
            })
          }
        </CartItemsList>

        <BillingInfo>
          <span>
            <p>Quantidade</p>
            <p>{cart.products.length} itens</p>
          </span>
          <span>
            <strong>
              Valor total
            </strong>
            <strong>
              {priceFormatter.format(cart.total / 100)}
            </strong>
          </span>
        </BillingInfo>

        <button disabled={isLoading} onClick={handleBuyProduct}>
          Finalizar compra
        </button>

      </Content>
    </Dialog.Portal>
  )
}