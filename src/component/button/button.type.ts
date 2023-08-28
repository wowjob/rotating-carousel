import type { MouseEvent, ReactNode } from 'react'

const buttonThemeList = ['full', 'outlined', 'text'] as const
type TButtonTheme = (typeof buttonThemeList)[number]

export type TButton = {
  name?: string
  theme: TButtonTheme
  children?: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export type $TButton = {
  [$ in keyof TButton as `$${string & $}`]: TButton[$]
}
