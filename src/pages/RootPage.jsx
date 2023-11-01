import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import { BarraNotifiche } from '../components/BarraNotifiche/BarraNotifiche'
import { Header } from '../components/Header/Header'

import CSS from './RootPage.module.css'

export function RootPage (props) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div
          className={`
          ${CSS.colAnimation} 
          ${!isVisible ? 'col-xs-12' : 'col-xs-7 col-sm-8 col-md-9'} `}
        >
          <div className='row'>
            <Header
              toggleNotifiche={() => {
                setIsVisible(prevState => !prevState)
              }}
              statoNotifiche={isVisible}
            />
          </div>
          <br />
          <main className='row'>
            <Outlet />
          </main>
        </div>
        <aside
          className={`${CSS.colAnimation} ${CSS.colNotifiche} 
           col-xs-5 col-sm-4 col-md-3 co pull-right ${
             isVisible ? CSS.toggleOn : CSS.toggleOff
           }`}
        >
          <div className='row'>
            <BarraNotifiche />
          </div>
        </aside>
      </div>
    </div>
  )
}
