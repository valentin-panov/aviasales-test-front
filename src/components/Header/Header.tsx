import React, { memo } from 'react'
import cn from 'clsx'
import { useDispatch } from 'react-redux'
import s from './Header.module.scss'
import { ticketsFetch } from '../../reducers/tickets'
import plane from '../../../src/img/btnPlane.png'

export type Props = {
  className?: string
}

export const Header = memo<Props>(({ className }) => {
  const dispatch = useDispatch()

  const getTicket = () => {
    dispatch(ticketsFetch())
  }

  return (
    <header className={cn(s.root, className)}>
      <button type={'button'} onClick={getTicket} className={s.btn}>
        <img src={plane} alt="plane" className={s.btn_img} />
      </button>
    </header>
  )
})

Header.displayName = 'Header'
