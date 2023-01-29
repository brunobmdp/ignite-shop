import Image from "next/image";
import Link from "next/link";

import * as Dialog from '@radix-ui/react-dialog';

import logo from '@/assets/logo.svg'
import { BagButton, HeaderContainer } from "@/styles/pages/header";
import { Handbag } from "phosphor-react";
import CartItemsModal from "../cartItemsModal";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";




export default function Header() {
  const { cart } = useContext(CartContext)

  const isFull = cart.products.length > 0
  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logo} alt="" />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton data-state={isFull}>
            <Handbag size={24} weight="bold" />
            <span data-state={isFull}>
              {cart.products.length}
            </span>
          </BagButton>
        </Dialog.Trigger>
        <CartItemsModal />
      </Dialog.Root>
    </HeaderContainer>
  )
}
