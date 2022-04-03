import React, { ReactElement } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import s from './TopFilters.module.scss'
import { useDispatch } from 'react-redux'
import { setFiltersSort } from '../../../reducers/filters'
import { InSort } from '../../../interfaces/Interfaces'

export default function TopFilters(): ReactElement {
  const dispatch = useDispatch()
  const [sorter, setSorter] = React.useState('price')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSorter: InSort
  ) => {
    if (newSorter) {
      dispatch(setFiltersSort(newSorter))
      setSorter(newSorter)
    }
  }
  return (
    <ToggleButtonGroup
      className={s.root}
      color="primary"
      value={sorter}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton className={s.item} value="price">
        Самый дешевый
      </ToggleButton>
      <ToggleButton className={s.item} value="time">
        Самый быстрый
      </ToggleButton>
      <ToggleButton className={s.item} value="optimal">
        Оптимальный
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
