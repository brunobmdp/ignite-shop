import { styled } from "..";

export const SuccessContainer = styled('main',{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin:'0 auto',
  height: 656,

  h1:{
    fontSize: '$2xl',
    color: '$gray100',
  },
  p:{
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a:{
    display:'block',
    marginTop: '5rem',
    color: '$green500',
    textDecoration:'none',
    fontWeight: 'bold',
    fontSize: '$lg',

    '&:hover':{
      color:'$green300',
      transition: 'all 0.2s',
    }
  },


})

export const ImagesList = styled('div',{
  display:'flex',
  alignItems:'center',
  justifyContent: 'center',
})

export const ImageContainer = styled('div',{
  width: '100%',
  maxWidth: 160,
  
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 1000,
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
 
  padding: '0.25rem',
  marginTop: '4rem',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:-44,

  img: {
    objectFit: 'cover',
  },
})
