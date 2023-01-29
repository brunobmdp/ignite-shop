import { styled } from "..";

export const HomeContainer = styled('main',{
  display: 'flex',
  // gap:'3rem',
  width: '100%',
  // maxWidth:'calc(100vw - ((100vw - 1180px)/2))',
  marginLeft: 'auto',
  minHeight:656,
})

export const Product = styled('div',{
  background:'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius:8,
  padding: '0.25rem',
  cursor: 'pointer',
  position:'relative',
  overflow: 'hidden',


  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img:{
    objectFit:'cover',
  },

  footer: {
    position:'absolute',
    bottom:'0.25rem',
    left:'0.25rem',
    right:'0.25rem',
    padding:'1.25rem',

    borderRadius:6,
    
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',

    background:'rgba(32, 32, 36, 0.9)',

    transform: 'translateY(110%)',
    opacity:0,
    transition: 'all 0.3s ease-in-out',
    
    div:{
      display: 'flex',
      flexDirection:'column',
      gap:'0.25rem',
    },

    strong:{
      fontSize:'$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    }, 

    button:{
      lineHeight:0,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      padding:'0.75rem',
      color:'$white',
      background:'$green500',
      border:'none',
      borderRadius:6,
      cursor:'pointer',
      zIndex:4,

    }

  },
  '&:hover': {
    footer:{
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})

export const ArrowSliderRight = styled('div',{
  position:'absolute',
  right:0,
  top:0,
  bottom:0,
  maxWidth: 136,
  width:'calc((100vw - 1180px)/2)',

  display:'flex',
  justifyContent:'end',
  alignItems:'center',
  
  background:'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',

  button:{
    background:'transparent',
    border:'none',
    marginRight: '1rem',
    cursor:'pointer',
    color: '$gray300'
  }
})
export const ArrowSliderLeft = styled('div',{
  position:'absolute',
  left:0,
  top:0,
  bottom:0,
  maxWidth: 136,
  width:'calc((100vw - 1180px)/2)',

  display:'flex',
  justifyContent:'end',
  alignItems:'center',
  
  background:'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
  transform: 'matrix(-1, 0, 0, 1, 0, 0)',

  button:{
    background:'transparent',
    border:'none',
    marginRight: '1rem',
    cursor:'pointer',
    color: '$gray300'
  }
})