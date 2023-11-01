import { Prodotto } from '../Prodotto/Prodotto'
import CSS from './ElencoProdotti.module.css'

export function ElencoProdotti (props) {
  return (
    <ul className={CSS.listContainer}>
      {props.listaProdotti.map(prodotto => (
        <Prodotto key={prodotto.id} prodotto={prodotto} />
      ))}
    </ul>
  )
}
