import React, { ReactElement, useState } from 'react'
import s from './SideFilters.module.scss'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

export default function SideFilters(): ReactElement {
  const [state, setState] = useState({
    all: true,
    s0: false,
    s1: false,
    s2: false,
    s3: false
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { all, s0, s1, s2, s3 } = state

  return (
    <section className={s.root}>
      <h2 className={s.sideFilters_title}>Количество пересадок</h2>
      <FormGroup>
        <FormControlLabel
          className={s.item}
          control={
            <Checkbox
              size={'small'}
              checked={all}
              name={'all'}
              onChange={handleChange}
            />
          }
          label="Все"
        />
        <FormControlLabel
          className={s.item}
          control={
            <Checkbox
              size={'small'}
              checked={s0}
              name={'s0'}
              onChange={handleChange}
            />
          }
          label="Без пересадок"
        />
        <FormControlLabel
          className={s.item}
          control={
            <Checkbox
              size={'small'}
              checked={s1}
              name={'s1'}
              onChange={handleChange}
            />
          }
          label="1 пересадка"
        />
        <FormControlLabel
          className={s.item}
          control={
            <Checkbox
              size={'small'}
              checked={s2}
              name={'s2'}
              onChange={handleChange}
            />
          }
          label="2 пересадки"
        />
        <FormControlLabel
          className={s.item}
          control={
            <Checkbox
              size={'small'}
              checked={s3}
              name={'s3'}
              onChange={handleChange}
            />
          }
          label="3 пересадки"
        />
      </FormGroup>
    </section>
  )
}
