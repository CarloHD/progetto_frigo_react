import CSS from './NavBar.module.css'

import { NavLink, useLocation } from 'react-router-dom'

export function NavBar (props) {
  const location = useLocation()

  const path = location.pathname

  return (
    <ul className='nav nav-tabs' style={{ borderBottom: 'none' }}>
      <li className={`${path === '/' ? 'active' : ''} icona`}>
        <NavLink to='/' className={CSS.navlink}>
          <span className='glyphicon glyphicon-home '></span>
        </NavLink>
      </li>
      <li className={`${path === '/edit' ? 'active' : ''} icona`}>
        <NavLink to='edit'>
          <span className='glyphicon glyphicon-plus'></span>
        </NavLink>
      </li>
    </ul>
  )
}
