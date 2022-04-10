import React, { memo } from 'react'
import cn from 'clsx'
import { shallowEqual, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import s from './Output.module.scss'
import { RootState } from '../../store'
import ZeroFound from '../ZeroFound/ZeroFound'
import Error404 from '../Error404/Error404'
import SideFilters from './SideFilters/SideFilters'
import TopFilters from './TopFilters/TopFilters'
import { TicketList } from './TicketList'

export type Props = {
  className?: string
}

export const Output = memo<Props>(({ className }) => {
  const ticketsStore = useSelector(
    (store: RootState) => store.tickets,
    shallowEqual
  )
  const { status, tickets } = ticketsStore

  return (
    <>
      <div className={cn(s.root, className)}>
        <div className={s.sideFilters}>
          <SideFilters />
        </div>
        <div className={s.topFilters}>
          <TopFilters />
        </div>
        <div className={s.tickets}>
          {status === 'pending' && <CircularProgress />}
          {status === 'success' && tickets.length > 0 && (
            <TicketList ticketsStore={tickets} />
          )}
          {status === 'success' && tickets.length === 0 && <ZeroFound />}
          {status === 'error' && <Error404 />}
        </div>
      </div>
    </>
  )
})

Output.displayName = 'Output'
