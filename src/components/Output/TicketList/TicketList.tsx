import React, { memo } from 'react'
import cn from 'clsx'
import { shallowEqual, useSelector } from 'react-redux'
import s from './TicketList.module.scss'
import { RootState } from '../../../store'
import { TicketCard } from './TicketCard'

export type Props = {
  className?: string
}

export const TicketList = memo<Props>(({ className }) => {
  const ticketsStore = useSelector(
    (store: RootState) => store.tickets,
    shallowEqual
  )
  const { tickets } = ticketsStore

  return (
    <div className={cn(s.root, className)}>
      {tickets.map((el) => (
        <TicketCard key={`${el.price}${el.carrier}`} ticket={el} />
      ))}
    </div>
  )
})

TicketList.displayName = 'TicketList'
