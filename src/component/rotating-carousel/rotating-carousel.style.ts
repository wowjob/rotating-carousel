import styled from 'styled-components'

export const SRotatingCarousel = styled.div`
  border: 10px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-top: 3rem;
  overflow: hidden;
  height: 57.5rem;
`

export const SButton = styled.button`
  align-self: center;
`

export const SItemGrid = styled.div`
  display: grid;
  height: 17rem; // 272px
  grid-template-columns: auto 14.25rem auto;
`

export const SItemWrapper = styled.div`
  border: 10px double brown;
  position: relative;
`
