import React, { memo } from 'react'
import cn from 'clsx'
import { shallowEqual, useSelector } from 'react-redux'
import s from './TicketList.module.scss'
import { RootState } from '../../../store'
import { TicketCard } from './TicketCard'
import { InTicket } from '../../../interfaces/Interfaces'

export type Props = {
  className?: string
}

export const TicketList = memo<Props>(({ className }) => {
  const filters = useSelector((store: RootState) => store.filters, shallowEqual)
  const ticketsStore = useSelector(
    (store: RootState) => store.tickets.tickets,
    shallowEqual
  )

  // console.log(
  //   filters.filter,
  //   Object.values(filters.filter).indexOf(false) === -1
  // )

  let tickets: InTicket[] =
    Object.values(filters.filter).indexOf(false) === -1
      ? [...ticketsStore]
      : [...ticketsStore].filter(
          (el) =>
            el.segments[0].stops.length !== 2 &&
            el.segments[1].stops.length !== 2
        )

  if (filters.filter) {
  }

  if (filters.sort === 'optimal') {
    tickets.sort((a, b) =>
      a.segments[0].stops.length + a.segments[1].stops.length >
      b.segments[0].stops.length + b.segments[1].stops.length
        ? 1
        : b.segments[0].stops.length + b.segments[1].stops.length >
          a.segments[0].stops.length + a.segments[1].stops.length
        ? -1
        : 0
    )
  } else if (filters.sort === 'time') {
    tickets.sort((a, b) =>
      a.segments[0].duration + a.segments[1].duration >
      b.segments[0].duration + b.segments[1].duration
        ? 1
        : b.segments[0].duration + b.segments[1].duration >
          a.segments[0].duration + a.segments[1].duration
        ? -1
        : 0
    )
  } else {
    tickets.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0))
  }

  return (
    <div className={cn(s.root, className)}>
      {tickets.slice(0, filters.limit).map((el) => (
        <TicketCard key={`${el.price}${el.carrier}`} ticket={el} />
      ))}
    </div>
  )
})

TicketList.displayName = 'TicketList'
