import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from '..';

const overlayIn = keyframes({
  '0%': {opacity: 0,},
  '100%': {opacity: 1,},
})
const overlayOut = keyframes({
  '0%': {opacity: 1,},
  '100%': {opacity: 0,},
})

export const Overlay = styled(Dialog.Overlay,{
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  animation:`${overlayOut} 200ms ease-in-out`,
  '&[data-state="open"]':{
    animation:`${overlayIn} 200ms ease-in-out`,
  },
})

const contentShow = keyframes({
  '0%': {transform:'translateX(100%)'},
  '100%': {transform:'translateX(0%)'},
})

const contentHidden = keyframes({
  '0%': {transform:'translateX(0%)'},
  '100%': {transform:'translateX(100%)'},
})

export const Content = styled(Dialog.Content,{
  position:'absolute',
  right:0,
  top:0,
  bottom:0,
  width:'100%',
  maxWidth:'30rem',
  padding:'3rem',

  display:'flex',
  flexDirection: 'column',

  animation:`${contentHidden} 200ms ease-in-out`,

  background:'$gray800', 
  '&[data-state="open"]':{
    animation:`${contentShow} 200ms ease-in-out`,
  },
  
  boxShadow:'-4px 0px 30px rgba(0, 0, 0, 0.8)',

  h2:{
    marginTop: '1.5rem',
    color:'$gray100',
    fontWeight:'bold',
    lineHeight:1.6,
    fontSize:'$lg',
  },

  'div + button': {
    marginTop:'auto',
    padding: '1.25rem',
    background: '$green500',

    display:'flex',
    justifyContent:'center',
    alignItems:'center',

    border:'none',

    borderRadius: 8,
    color:'$gray100',

    lineHeight:1.6,
    fontSize:'$md',
    fontWeight:'bold',

    cursor:'pointer',

    '&:disabled':{
      cursor:'not-allowed',
      opacity:0.6,
    },

    '&:hover':{
      transition:'all 0.2s',
      background: '$green300',
    },
  },
  
})


export const CartItemsList = styled('div',{
  display:'flex',
  flexDirection: 'column',
  gap:'1.5rem',
  marginTop:'2rem',
  flex: 1,
})

export const CartItem = styled('div',{
  display:'flex',
  gap:'1.25rem',
})

export const ImageContainer = styled('div',{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:8,
  background:'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  img:{
    objectFit:'cover',
  }
})

export const ItemInfo = styled('div',{
  display:'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  p:{
    display:'flex',
    flexDirection:'column',

    fontSize:'$md',
    lineHeight: 1.6,
    color:'$gray300',
  },

  strong:{
    color:'$gray100',
  },

  span:{
    marginRight:'auto',
    fontSize:'1rem',
    fontWeight:'bold',
    color:'$green500',
    cursor:'pointer',

    '&:hover':{
      color:'$green300',
      transition: 'all 0.2s',
    },
  },

})

export const BillingInfo = styled('div',{
  display:'flex',
  flexDirection:'column',
  flex:1,
  justifyContent:'flex-end',
  marginBottom:'3.5rem',
  '> span':{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },

  p:{
    color:'$gray300',
    fontSize:'$md',
    lineHeight:1.6,
  },
  strong:{
    color:'$gray100',
    fontSize:'$xl',
    lineHeight:1.6,
  }

})


export const CloseButton = styled(Dialog.Close,{
  position:'absolute',
  top:24,
  right:24,
  lineHeight:0,
  background:'transparent',
  border:'none',
  color:'$gray300',
  cursor:'pointer',
  transition:'all 0.2s',

  '&:hover':{
    color:'$gray100',
  }
})