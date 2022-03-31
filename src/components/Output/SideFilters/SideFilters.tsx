import React, { ReactElement } from 'react'
import s from './SideFilters.module.scss'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

export default function SideFilters(): ReactElement {
  return (
    <section className={s.root}>
      <h2 className={s.sideFilters_title}>Количество пересадок</h2>
      <FormGroup>
        <FormControlLabel
          className={s.item}
          control={<Checkbox size={'small'} defaultChecked />}
          label="Все"
        />
        <FormControlLabel
          className={s.item}
          control={<Checkbox size={'small'} />}
          label="Без пересадок"
        />
        <FormControlLabel
          className={s.item}
          control={<Checkbox size={'small'} />}
          label="1 пересадка"
        />
        <FormControlLabel
          className={s.item}
          control={<Checkbox size={'small'} />}
          label="2 пересадки"
        />
        <FormControlLabel
          className={s.item}
          control={<Checkbox size={'small'} />}
          label="3 пересадки"
        />
      </FormGroup>
    </section>
  )
}
