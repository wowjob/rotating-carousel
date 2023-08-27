import styled from 'styled-components'
import type { $TRotatingItem } from './rotating-item.type'

export const SRotatingItem = styled.div<$TRotatingItem>`
  transform: translateY(${({ $focused }) => ($focused ? 0 : '-18rem')})
    scale(${({ $focused }) => ($focused ? 1 : 0.75)})
    rotate(${({ $angle = 0 }) => `${$angle * 18}deg`});
  transform-origin: 50% 80rem;
  transition: 250ms;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;

  /* mobile only */
  @media (pointer: coarse) and (max-width: 48rem) {
    transform: translateY(${({ $focused }) => ($focused ? 0 : '-17rem')})
      scale(${({ $focused }) => ($focused ? 1 : 0.75)})
      rotate(${({ $angle = 0 }) => `${$angle * 16.5}deg`});
  }
`

export const SRotatingImageText = styled.p<$TRotatingItem>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $textColour }) => $textColour};
  font-family: 'Johnnie Walker Sans Headline';
  font-size: 3.5rem;
  line-height: 3rem;
`

export const SRotatingImageWrapper = styled.div<$TRotatingItem>`
  position: relative;
  inset: 0;
  width: 14.25rem; // 228px
  height: 17rem; // 272px
  position: relative;

  &::before,
  &::after {
    width: 2rem;
    aspect-ratio: 1;
    position: absolute;
    top: 1rem;
    left: 1rem;
    transition: 250ms;
  }

  &::before {
    content: '';
    border: 0.125rem solid
      ${({ $checked }) => ($checked ? 'var(--black)' : 'var(--white)')};
    background: transparent;
  }

  &::after {
    font-family: 'jw-icon';
    content: '\\e900';
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ $checked }) => ($checked ? 'var(--white)' : 'transparent')};
    background: ${({ $checked }) =>
      $checked ? 'var(--black)' : 'transparent'};
  }
`

export const SRotatingLabel = styled.label`
  cursor: pointer;
  position: relative;
`

export const SRotatingDescription = styled.p`
  position: relative;
  min-height: 5rem;
  font-size: 1rem;
  line-height: 1.5;
  font-family: 'Johnnie Walker Serif Book', serif;

  text-align: center;
  pointer-events: none;
  transition: 250ms;
`

export const SRotatingInput = styled.input`
  position: fixed;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`
