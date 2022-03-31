import React, { memo, useEffect } from 'react'
import cn from 'clsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import s from './Header.module.scss'
import plane from '../../../src/img/btnPlane.png'
import { tokenFetch } from '../../reducers/token'
import { RootState } from '../../store'
import { ticketsFetch } from '../../reducers/tickets'

export type Props = {
  className?: string
}

export const Header = memo<Props>(({ className }) => {
  const dispatch = useDispatch()
  const { token } = useSelector((store: RootState) => store.token, shallowEqual)

  const getTicket = () => {
    if (token) {
      dispatch(ticketsFetch(token))
    }
  }

  useEffect(() => {
    if (!token) {
      dispatch(tokenFetch())
    }
  }, [dispatch, token])

  return (
    <header className={cn(s.root, className)}>
      <button type={'button'} onClick={getTicket} className={s.btn}>
        <img src={plane} alt="plane" className={s.btn_img} />
      </button>
    </header>
  )
})

Header.displayName = 'Header'
