import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import { CartDropdowwnContainer, CartItems, EmptyMessage } from './cart-dropdown.style';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';

const CartDropdowwn = () => {
  const { cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = ()=>{
    navigate('/checkout')
  }
  return (
    <CartDropdowwnContainer>
        <CartItems>
          {
            cartItems.length ? cartItems.map((item)=> (
          <CartItem key={item.id} cartItem={item}/>)):(
            <EmptyMessage>Your cart is empty</EmptyMessage>
          ) } 
        </CartItems>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdowwnContainer>
  )
}

export default CartDropdowwn
