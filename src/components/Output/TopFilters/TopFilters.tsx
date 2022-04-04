import React, { ReactElement } from 'react'
import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material'
import s from './TopFilters.module.scss'
import { useDispatch } from 'react-redux'
import { setFiltersSort } from '../../../reducers/filters'
import { InSort } from '../../../interfaces/Interfaces'

const StyledToggleButton = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#2196F3'
  }
})

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
      <StyledToggleButton className={s.item} value="price">
        Самый дешевый
      </StyledToggleButton>
      <StyledToggleButton className={s.item} value="time">
        Самый быстрый
      </StyledToggleButton>
      <StyledToggleButton className={s.item} value="optimal">
        Оптимальный
      </StyledToggleButton>
    </ToggleButtonGroup>
  )
}
