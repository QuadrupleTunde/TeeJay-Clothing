import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './navigation.style.scss';
import { ReactComponent as CrownLg } from '../../../assets/crown.svg'

const Navigation = () => {
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
            <Link className='nav-link' to='/auth'>
                LOGIN
            </Link>
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }
  
  export default Navigation
  
  