import React, { memo } from 'react'
import cn from 'clsx'
import s from './Footer.module.scss'

export type Props = {
  className?: string
}

export const Footer = memo<Props>(({ className }) => (
  <footer className={cn(s.root, className)}>
    <a href={'https://www.linkedin.com/in/valentin-panov/'} className={s.link}>
      Valentin Panov, Mar 2022
    </a>
  </footer>
))

Footer.displayName = 'Footer'
