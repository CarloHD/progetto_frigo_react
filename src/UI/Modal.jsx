import CSS from './Modal.module.css'

export function Modal ({ children }) {
  return (
    <div className={`panel panel-info text-info ${CSS.modal}`}>
      <div className='panel-body bg-info'>{children}</div>
    </div>
  )
}
