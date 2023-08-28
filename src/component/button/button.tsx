import { SButton } from './button.style'
import type { TButton } from './button.type'

export const Button = ({ theme, children, onClick }: TButton) => {
  return (
    <SButton $theme={theme} $onClick={onClick}>
      {children}
    </SButton>
  )
}
