import { styled } from "..";

export const HeaderContainer = styled('header',{
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',

  
})
export const BagButton = styled('button',{
  display:'flex',
  justifyContent:'center',
  alignItems: 'center',

  background:'$gray800',
  border:'none',
  padding: '0.75rem',
  borderRadius: 6,
  lineHeight:0,
  cursor:'pointer',
  position:'relative',
  color:'$gray100',
  '&[data-state=false]':{
    color:'$gray300',
  },
  

  span:{
    position:'absolute',
    background: '$green500',
    width:24,
    height:24,
    lineHeight:0,
    fontWeight:'bold',
    fontSize:14,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top:0,
    right:0,
    transform: 'translate(25%,-25%)',
    borderRadius:'50%',
    
    '&[data-state=false]':{
      display:'none',
    },
  }

})



