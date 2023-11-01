import { useContext } from 'react'
import CSS from './Prodotto.module.css'
import { frigoContext } from '../../store/frigo-context'
import { useNavigate } from 'react-router-dom'

export function Prodotto ({ prodotto }) {
  const frigoCtx = useContext(frigoContext)

  const navigate = useNavigate()

  const dataAggiuntaProdotto =
    prodotto.data_scansione_prodotto.toLocaleDateString()

  const scadenzaProdotto = prodotto.data_scadenza.toLocaleDateString()

  const rimuoviProdotto = () => {
    frigoCtx.prodotti.rimuoviProdotto(prodotto.id, prodotto.nome)
  }

  return (
    <div className='col-xs-12 col-sm-4 col-md-3'>
      <li className={`panel panel-info text-info ${CSS.prodotto}`}>
        <div className='panel-heading'>
          <h3 className='panel-title text-center'>
            <b>{prodotto.nome}</b>{' '}
            <span className='badge'>{prodotto.quantita}</span>
          </h3>
        </div>
        <div className='panel-body bg-info'>
          <p>Aggiunto il: {dataAggiuntaProdotto}</p>
          <p>Scadenza: {scadenzaProdotto}</p>
        </div>

        <div className={`btn-group btn-group-justified ${CSS.controls}`}>
          <div className='btn-group'>
            <button
              className='btn btn-default'
              onClick={() => navigate(`/edit/${prodotto.id}`)}
            >
              Modifica
            </button>
          </div>
          <div className='btn-group'>
            <button className='btn btn-danger' onClick={rimuoviProdotto}>
              Elimina
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}
