import styled from 'styled-components'
import type { $TRotatingItem } from './rotating-item.type'

export const SRotatingItem = styled.div<$TRotatingItem>`
  transform: rotate(${({ $angle }) => `${$angle * 15}deg`});
  transform-origin: 50% 80rem;
  transition: 250ms;
  width: 14.25rem; // 228px
  height: 17rem; // 272px
  border: 1px solid purple;
  display: inline-block;
  position: absolute;
`

export const SRotatingLabel = styled.label`
  border: 1px solid green;
`

export const SRotatingInput = styled.input`
  border: 10px solid pink;
`
