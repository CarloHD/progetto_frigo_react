import { useContext } from 'react'

import { ElencoProdotti } from '../components/ElencoProdotti/ElencoProdotti'
import { frigoContext } from '../store/frigo-context'

export function HomePage (props) {
  const frigoCtx = useContext(frigoContext)

  return (
    <div className='col-xs-12'>
      <ElencoProdotti listaProdotti={frigoCtx.prodotti.lista} />
    </div>
  )
}
