import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './navigation.style.scss';
import { ReactComponent as CrownLg } from '../../../assets/crown.svg';
import { UserContext } from '../../../contexts/user.context';
import { SignOutUser } from '../../../utils/firebase/firebase.utils';


const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  
  
 
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
            
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }
  
  export default Navigation
  
  