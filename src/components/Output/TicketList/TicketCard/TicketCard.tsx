import React, { memo } from 'react'
import cn from 'clsx'
import s from './TicketCard.module.scss'
import { InTicket } from '../../../../interfaces/Interfaces'
import { getBeautifulNumber } from '../../../../helpers/getBeatifulNumber'
import { Segment } from './Segment'

export type Props = {
  className?: string
  ticket: InTicket
}

export const TicketCard = memo<Props>(({ className, ticket }) => {
  const { price, carrier } = ticket
  return (
    <div className={cn(s.root, className)}>
      <div className={s.price}>{getBeautifulNumber(price)} ₽</div>
      <div className={s.carrier}>
        <img
          className={s.carrier_img}
          alt={carrier}
          src={`https://pics.avs.io/99/36/${carrier}.png`}
        />
      </div>
      <div className={cn(s.segments)}>
        {ticket.segments.map((el) => (
          <Segment key={`${el.date}${el.stops}${el.duration}`} segment={el} />
        ))}
      </div>
    </div>
  )
})

TicketCard.displayName = 'TicketList'
