import type { ReactNode } from 'react'
import classes from './FadeIn.module.css'

/** Плавное появление содержимого, когда загрузка закончилась. */
export default function FadeIn({ children }: { children: ReactNode }) {
  return <div className={classes.root}>{children}</div>
}
