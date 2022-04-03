import React, { ReactElement, useEffect, useState } from 'react'
import s from './SideFilters.module.scss'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { InFilter } from '../../../interfaces/Interfaces'
import { useDispatch } from 'react-redux'
import { setFiltersFilter } from '../../../reducers/filters'

export default function SideFilters(): ReactElement {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState<InFilter>({
    s0: true,
    s1: true,
    s2: true,
    s3: true
  })
  const [all, setAll] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name !== 'all' && !event.target.checked) {
      setFilters({
        ...filters,
        [event.target.name]: event.target.checked
      })
      setAll(false)
    } else if (event.target.name === 'all' && event.target.checked) {
      setAll(true)
      setFilters({
        s0: true,
        s1: true,
        s2: true,
        s3: true
      }) // здесь должно быть более красивое решение, но время поджимает
    } else {
      if (event.target.name !== 'all') {
        setFilters({
          ...filters,
          [event.target.name]: event.target.checked
        })
      }
    }
  }

  useEffect(() => {
    dispatch(setFiltersFilter(filters))
  }, [dispatch, filters])

  const { s0, s1, s2, s3 } = filters

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
