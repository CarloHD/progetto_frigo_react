import { createContext, useEffect, useState } from 'react'

const listaProdotti_DUMMY = [
  {
    id: 'p01',
    nome: 'brick latte',
    quantita: 1,
    data_scansione_prodotto: new Date(),
    data_scadenza: new Date(2023, 7, 10)
  },
  {
    id: 'p02',
    nome: 'uova',
    quantita: 6,
    data_scansione_prodotto: new Date(),
    data_scadenza: new Date(2023, 7, 15)
  },
  {
    id: 'p03',
    nome: 'mozzarella',
    quantita: '2',
    data_scansione_prodotto: new Date(),
    data_scadenza: new Date(2023, 8, 14)
  }
]
const valoreStato = stato => {
  switch (stato) {
    case 'success':
      return 3

    case 'warning':
      return 1

    case 'danger':
      return 2

    default:
      return 0
  }
}
// const listaNotifiche_DUMMY = [
//   { messaggio: 'notifica warn', stato: 'warning', id: 1 },
//   { messaggio: 'notifica danger', stato: 'danger', id: 2 },
//   { messaggio: 'notifica success', stato: 'success', id: 3 },
//   {
//     messaggio: 'notifica ',
//     stato: 'success',
//     id: 4
//   }
// ].sort((a, b) => valoreStato(a.stato) < valoreStato(b.stato))

export const frigoContext = createContext({
  prodotti: {
    lista: [],
    aggiungiProdotto: () => {},
    rimuoviProdotto: () => {},
    modificaProdotto: () => {}
  },
  notifiche: {
    lista: [],

    rimuoviNotifica: () => {}
  }
})

export function FrigoProvider (props) {
  const [listaProdotti, setListaProdotti] = useState(listaProdotti_DUMMY)

  const aggiungiProdotto = prodotto => {
    setListaProdotti(prevState => [...prevState, prodotto])

    setListaNotifiche(prevState => {
      return [
        {
          messaggio: `"${prodotto.nome}" è stato aggiunto con successo`,
          stato: 'success',
          id: Math.random().toString().slice(2)
        },
        ...prevState
      ]
    })
  }

  const rimuoviProdotto = (id, nome) => {
    setListaProdotti(prevState => [
      ...prevState.filter(prodotto => prodotto.id !== id)
    ])

    setListaNotifiche(prevState => {
      return [
        {
          messaggio: `"${nome}" è stato rimosso con successo`,
          stato: 'success',
          id: Math.random().toString().slice(2)
        },
        ...prevState
      ]
    })

    rimuoviNotifica(id)
  }

  const modificaProdotto = prodottoModificato => {
    const indexProdotto = listaProdotti.findIndex(
      prodotto => prodotto.id === prodottoModificato.id
    )

    const listaProdottiAggiornata = [...listaProdotti]

    listaProdottiAggiornata[indexProdotto] = prodottoModificato

    setListaProdotti(listaProdottiAggiornata)

    setListaNotifiche(prevState => {
      return [
        {
          messaggio: `"${prodottoModificato.nome}" è stato modificato con successo`,
          stato: 'success',
          id: Math.random().toString().slice(2)
        },
        ...prevState
      ]
    })

    rimuoviNotifica(prodottoModificato.id)
  }

  const [listaNotifiche, setListaNotifiche] = useState([])

  const rimuoviNotifica = id => {
    setListaNotifiche(prevState => [
      ...prevState.filter(notifica => notifica.id !== id)
    ])
  }

  useEffect(() => {
    const settimana = 604800000

    listaProdotti.forEach(prodotto => {
      const dataAttuale = new Date().getTime()

      const dataScadenza = prodotto.data_scadenza.getTime()

      const scadenzaRimanente = dataScadenza - dataAttuale

      const notificaEsistente = !!listaNotifiche.find(
        notifica => notifica.id === prodotto.id
      )

      if (scadenzaRimanente < 0 && !notificaEsistente) {
        setListaNotifiche(prevState => {
          return [
            {
              messaggio: (
                <>
                  "{prodotto.nome}" è scaduto! Controlla <u>attentamente</u> le
                  sue condizioni prima di consumarlo
                </>
              ),
              stato: 'danger',
              id: prodotto.id
            },
            ...prevState
          ]
        })
      } else if (scadenzaRimanente < settimana && !notificaEsistente) {
        const giorniRimanenti = new Date(scadenzaRimanente).getDate()
        const messaggioGiorniRimanenti = (
          <>
            "{prodotto.nome}" sta per scadere, consumalo
            <b>
              {' '}
              entro {giorniRimanenti}
              {giorniRimanenti > 1 ? ' giorni' : ' giorno'}
            </b>
          </>
        )

        setListaNotifiche(prevState => {
          return [
            {
              messaggio: messaggioGiorniRimanenti,
              stato: 'warning',
              id: prodotto.id
            },
            ...prevState
          ]
        })
      }
    })

    setListaNotifiche(prevState =>
      prevState.sort((a, b) => valoreStato(a.stato) < valoreStato(b.stato))
    )

    // setListaNotifiche(
    //   [...listaNotifiche].sort((a, b) => {
    //     return valoreStato(a.stato) > valoreStato(b.stato)
    //   })
    // )
  }, [listaProdotti])

  return (
    <frigoContext.Provider
      value={{
        prodotti: {
          lista: listaProdotti,
          aggiungiProdotto,
          rimuoviProdotto,
          modificaProdotto
        },
        notifiche: {
          lista: listaNotifiche,

          rimuoviNotifica
        }
      }}
    >
      {props.children}
    </frigoContext.Provider>
  )
}
