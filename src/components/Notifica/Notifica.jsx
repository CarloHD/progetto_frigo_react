import CSS from './Notifica.module.css'

export function Notifica ({ messaggio, stato, id, onClose }) {
  const classiNotifica = `list-group-item list-group-item-${stato} ${CSS.notifica}`

  const rimuoviNotifica = () => {
    onClose(id)
  }

  return (
    <li className={classiNotifica}>
      <div className='text-center'>
        <b>
          {stato === 'warning' && 'In scadenza'}
          {stato === 'danger' && 'Scaduto!'}
        </b>
      </div>

      <div className={`${CSS.body} text-center`}>
        <p>{messaggio}</p>
        {stato === 'success' && (
          <button type='button' className='close' onClick={rimuoviNotifica}>
            <span>&times;</span>
          </button>
        )}
      </div>
    </li>
  )
}
