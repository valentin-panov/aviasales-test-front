import React, { memo } from 'react'
import cn from 'clsx'
import s from './Segment.module.scss'
import { InSegment } from '../../../../../interfaces/Interfaces'
import {
  getBeautifulDateInTimeFromString,
  min2mmhh
} from '../../../../../helpers/secToDateTime'
import { declOfSwitches } from '../../../../../helpers/declOfSwitches'

export type Props = {
  className?: string
  segment: InSegment
}

export const Segment = memo<Props>(({ className, segment }) => {
  const { date, duration, origin, stops, destination } = segment
  return (
    <div className={cn(s.root, className)}>
      <div className={cn(s.upperRow, s.route)}>
        {origin} – {destination}
      </div>
      <div className={cn(s.lowerRow, s.date)}>
        {getBeautifulDateInTimeFromString(date)}
      </div>
      <div className={cn(s.upperRow, s.durationTitle)}>В пути</div>
      <div className={cn(s.lowerRow, s.duration)}>{min2mmhh(duration)}</div>
      <div className={cn(s.upperRow, s.switchesCount)}>
        {stops.length > 0 ? declOfSwitches(stops.length) : 'Прямой'}
      </div>
      <div className={cn(s.lowerRow, s.switchesList)}>
        {stops.length > 0 && stops.join(', ')}
      </div>
    </div>
  )
})

Segment.displayName = 'TicketList'
