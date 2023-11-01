import { useContext } from 'react'

import { Notifica } from '../Notifica/Notifica'
import { frigoContext } from '../../store/frigo-context'

import CSS from './BarraNotifiche.module.css'

export function BarraNotifiche (props) {
  const frigoCtx = useContext(frigoContext)

  const rimuoviNotifica = id => {
    frigoCtx.notifiche.rimuoviNotifica(id)
  }

  return (
    <div className={`col-xs-12 ${CSS.barraNotifiche} `}>
      <br />

      {frigoCtx.notifiche.lista.length === 0 && (
        <div>
          <p className='alert alert-info text-center'>Non ci sono notifiche</p>
        </div>
      )}

      <ul className='list-group'>
        {frigoCtx.notifiche.lista.map(notifica => (
          <Notifica
            messaggio={notifica.messaggio}
            stato={notifica.stato}
            id={notifica.id}
            key={notifica.id}
            onClose={rimuoviNotifica}
          />
        ))}
      </ul>
    </div>
  )
}
