import React, { ReactElement } from 'react'
import s from './Error404.module.scss'

export default function Error404(): ReactElement {
  return (
    <section className={s.root}>
      <h2>Ошибка получения данных.</h2>
      <p>Попробуйте в ещё раз</p>
    </section>
  )
}
