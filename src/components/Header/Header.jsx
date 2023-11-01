import { NavBar } from '../NavBar/NavBar'
import { useContext } from 'react'
import { frigoContext } from '../../store/frigo-context'

import CSS from './Header.module.css'

export function Header ({ toggleNotifiche, statoNotifiche }) {
  const frigoCtx = useContext(frigoContext)

  const numeroNotifiche = frigoCtx.notifiche.lista.length

  return (
    <header className={`col-xs-12 ${CSS.header}`}>
      <div className='row'>
        <h1 className='page-header text-info text-center'>Frigo App</h1>
      </div>
      <div className={`${CSS.rowNavbar}`}>
        <NavBar />

        <div
          className={`${CSS.pulsanteNotifica} icona`}
          style={statoNotifiche ? { backgroundColor: '#fff' } : {}}
          onClick={() => {
            toggleNotifiche()
          }}
        >
          <span className={`glyphicon glyphicon-bell text-info`}></span>

          {numeroNotifiche > 0 && (
            <span className={`badge ${CSS.badgeNotifiche} text-danger`}>
              {numeroNotifiche}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
