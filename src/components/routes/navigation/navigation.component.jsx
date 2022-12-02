import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdowwn from '../../cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLg } from '../../../assets/crown.svg';
import { UserContext } from '../../../contexts/user.context';
import { CartContext } from '../../../contexts/cart-context';
import { SignOutUser } from '../../../utils/firebase/firebase.utils';
import { NavigationContainer, NavLink, LogoContainer, NavLinkContainer } from './navigation.style';

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)
  
 
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLg className='logo'/>
            </LogoContainer>
       
          <NavLinkContainer>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {currentUser ? (
              <NavLink as='span' onClick={SignOutUser}>SIGN OUT</NavLink>)
              :(<NavLink to='/auth'>
                    SIGN IN
                </NavLink>
            )}
            <CartIcon/>
          </NavLinkContainer>
          {isCartOpen && <CartDropdowwn/>}    
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }
  
  export default Navigation
  
  