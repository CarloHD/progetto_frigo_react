import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { frigoContext } from '../../store/frigo-context'

import { InputFoto } from '../InputFoto/InputFoto'

export function FormProdotto (props) {
  const params = useParams()
  const id = params.id

  const frigoCtx = useContext(frigoContext)
  const navigate = useNavigate()

  const [nomeValue, setNomeValue] = useState('')
  const nomeInputHandler = event => {
    setNomeValue(event.target.value)
  }
  const [nomeInputAltVisible, setNomeInputAltVisible] = useState(false)

  const [quantitaValue, setQuantitaValue] = useState('')
  const quantitaInputHandler = event => {
    setQuantitaValue(event.target.value)
  }
  const [scadenzaValue, setScadenzaValue] = useState('')
  const scadenzaInputHandler = event => {
    setScadenzaValue(event.target.value)
  }
  const [scadenzaInputAltVisible, setScadenzaInputAltVisible] = useState(false)

  useEffect(() => {
    if (id) {
      const editProdotto = frigoCtx.prodotti.lista.find(
        prodotto => prodotto.id === id
      )

      if (editProdotto) {
        setNomeValue(editProdotto.nome)
        setQuantitaValue(editProdotto.quantita)

        setScadenzaValue(
          editProdotto.data_scadenza.toISOString().substring(0, 10)
        )
      } else {
        navigate(-1, { relative: 'route' })
      }
    } else {
      setNomeValue('')
      setQuantitaValue('')
      setScadenzaValue('')
    }
  }, [frigoCtx.prodotti.lista, id, navigate])

  const submitProdotto = event => {
    event.preventDefault()

    let prodotto = {
      nome: nomeValue.charAt(0).toUpperCase() + nomeValue.slice(1),
      quantita: quantitaValue,
      data_scansione_prodotto: new Date(),
      data_scadenza: new Date(scadenzaValue)
    }

    if (id) {
      prodotto = { ...prodotto, id }
      frigoCtx.prodotti.modificaProdotto(prodotto)
      navigate('/')
    } else {
      if (nomeValue && quantitaValue && scadenzaValue) {
        prodotto = { ...prodotto, id: Math.random().toString().slice(2) }

        frigoCtx.prodotti.aggiungiProdotto(prodotto)
        navigate('/')
      }
    }
  }

  return (
    <>
      <form onSubmit={submitProdotto} className='panel panel-info text-info'>
        <div className='panel-body bg-info'>
          <div className='form-group'>
            <label htmlFor='nome'>Nome prodotto</label>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                id='nome'
                value={nomeValue}
                onChange={nomeInputHandler}
              />
              <span className='input-group-btn'>
                <button
                  className={`btn  ${
                    nomeInputAltVisible ? 'btn-primary' : 'btn-info'
                  }`}
                  onClick={() => {
                    setNomeInputAltVisible(prevState => !prevState)
                  }}
                >
                  <span className='glyphicon glyphicon-camera' />
                </button>
              </span>
            </div>
          </div>
          {nomeInputAltVisible && (
            <InputFoto inputVisibile={nomeInputAltVisible} />
          )}
          <div className='form-group'>
            <label htmlFor='quantita'>Quantità</label>
            <input
              type='number'
              className='form-control'
              id='quantita'
              value={quantitaValue}
              onChange={quantitaInputHandler}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='scadenza'>Data di scadenza</label>

            <div className='input-group'>
              <input
                type='date'
                className='form-control'
                id='scadenza'
                value={scadenzaValue}
                onChange={scadenzaInputHandler}
              />
              <span className='input-group-btn'>
                <button
                  className={`btn  ${
                    scadenzaInputAltVisible ? 'btn-primary' : 'btn-info'
                  }`}
                  onClick={() => {
                    setScadenzaInputAltVisible(prevState => !prevState)
                  }}
                >
                  <span className='glyphicon glyphicon-camera' />
                </button>
              </span>
            </div>
          </div>
          {scadenzaInputAltVisible && (
            <InputFoto inputVisibile={nomeInputAltVisible} />
          )}
          <button type='submit' className='btn btn-info'>
            {id ? 'Modifica' : 'Aggiungi'}
          </button>
        </div>
      </form>
    </>
  )
}
