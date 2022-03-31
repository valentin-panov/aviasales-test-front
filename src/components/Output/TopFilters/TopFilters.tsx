import React, { ReactElement } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import s from './TopFilters.module.scss'

export default function TopFilters(): ReactElement {
  const [alignment, setAlignment] = React.useState('web')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }
  return (
    <ToggleButtonGroup
      className={s.root}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton className={s.item} value="web">
        Самый дешевый
      </ToggleButton>
      <ToggleButton className={s.item} value="android">
        Самый быстрый
      </ToggleButton>
      <ToggleButton className={s.item} value="ios">
        Оптимальный
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
