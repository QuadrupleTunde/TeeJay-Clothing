import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon.component';
import './navigation.style.scss';
import CartDropdowwn from '../../cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLg } from '../../../assets/crown.svg';
import { UserContext } from '../../../contexts/user.context';
import { CartContext } from '../../../contexts/card-context';
import { SignOutUser } from '../../../utils/firebase/firebase.utils';


const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)
  
 
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLg className='logo'/>
            </Link>
       
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {currentUser ? (
              <span className='nav-link' onClick={SignOutUser}>SIGN OUT</span>)
              :(<Link className='nav-link' to='/auth'>
                    SIGN IN
                </Link>
            )}
            <CartIcon/>
          </div>
          {isCartOpen && <CartDropdowwn/>}    
        </div>
        <Outlet/>
      </Fragment>
    )
  }
  
  export default Navigation
  
  