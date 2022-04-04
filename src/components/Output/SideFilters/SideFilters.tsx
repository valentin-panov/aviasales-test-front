import React, { ReactElement, useEffect, useState } from 'react'
import s from './SideFilters.module.scss'
import { Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material'
import { InFilter } from '../../../interfaces/Interfaces'
import { useDispatch } from 'react-redux'
import { setFiltersFilter } from '../../../reducers/filters'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

const StyledCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root, &.MuiCheckbox-root:hover': {
    color: '#9ABBCE',
    backgroundColor: 'transparent'
  },
  '&.Mui-checked, &.Mui-checked:hover': {
    color: '#2196F3'
  }
})

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
            <StyledCheckbox
              size={'medium'}
              checked={all}
              name={'all'}
              onChange={handleChange}
              checkedIcon={<CheckBoxOutlinedIcon />}
            />
          }
          label="Все"
        />
        <FormControlLabel
          className={s.item}
          control={
            <StyledCheckbox
              size={'medium'}
              checked={s0}
              name={'s0'}
              onChange={handleChange}
              checkedIcon={<CheckBoxOutlinedIcon />}
            />
          }
          label="Без пересадок"
        />
        <FormControlLabel
          className={s.item}
          control={
            <StyledCheckbox
              size={'medium'}
              checked={s1}
              name={'s1'}
              onChange={handleChange}
              checkedIcon={<CheckBoxOutlinedIcon />}
            />
          }
          label="1 пересадка"
        />
        <FormControlLabel
          className={s.item}
          control={
            <StyledCheckbox
              size={'medium'}
              checked={s2}
              name={'s2'}
              onChange={handleChange}
              checkedIcon={<CheckBoxOutlinedIcon />}
            />
          }
          label="2 пересадки"
        />
        <FormControlLabel
          className={s.item}
          control={
            <StyledCheckbox
              size={'medium'}
              checked={s3}
              name={'s3'}
              onChange={handleChange}
              checkedIcon={<CheckBoxOutlinedIcon />}
            />
          }
          label="3 пересадки"
        />
      </FormGroup>
    </section>
  )
}
