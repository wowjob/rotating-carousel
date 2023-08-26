import { useEffect, useReducer, useRef } from 'react'
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react'
import {
  SButton,
  SItemGrid,
  SRotatingCarousel,
} from './rotating-carousel.style'
import {
  initialValue,
  rotatingCarouselReducer,
} from './rotating-carousel.reducer'
import { RotatingItem } from '../rotating-item'
import { A } from './rotating-carousel.action'
import { generateSequence } from '../../util'

export const RotatingCarousel = () => {
  const rotatingCarouselRef = useRef(null)
  const [state, dispatch] = useReducer(rotatingCarouselReducer, initialValue)
  const {
    list,
    postURL,
    initialized,
    selectedList,
    maxSelected,
    lastFocused,
    minimumItemNumber,
    originalItemNumber,
  } = state

  useEffect(() => {
    if (!initialized) {
      dispatch(A.actionInit())
    }
    console.log(state)
  }, [initialized])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(A.actionToggleInput(+(e.target.dataset.id || 0)))
  }

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    dispatch(A.actionFocusInput(e.target.id))
  }

  const focusPrev = () => {
    dispatch(A.actionFocusPrevInput())
  }

  const focusNext = () => {
    dispatch(A.actionFocusNextInput())
  }

  const removeItem = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    dispatch(A.actionRemoveInput(name))
  }

  // fix for Safari
  // const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
  //   if (
  //     e.key === 'Tab' &&
  //     rotatingCarouselRef.current &&
  //     rotatingCarouselRef.current.contains(document.activeElement)
  //   ) {
  //     e.preventDefault()
  //     if (e.shiftKey) {
  //       focusPrev()
  //     } else {
  //       focusNext()
  //     }
  //     console.log(e.key)
  //   }
  // }

  const lastFocusedIndex = +lastFocused.split('-')[3] - 1
  const howManyLeftAndRight = 6
  const arr = generateSequence(
    lastFocusedIndex,
    minimumItemNumber,
    howManyLeftAndRight * 2,
  )

  const whichOneFocused = (lastFocusedIndex + 1) % originalItemNumber
  const whichOneFocusedPretty =
    whichOneFocused === 0 ? originalItemNumber : whichOneFocused

  return (
    <div>
      <SRotatingCarousel
        // onKeyUp={onKeyUp}
        ref={rotatingCarouselRef}
      >
        <h1>WHAT FLAVOURS ARE YOU FEELING?</h1>
        <div>
          <span>Please select up to {maxSelected} flavours</span>
          {selectedList.length > 0 && (
            <span>
              ({selectedList.length}/{maxSelected})
            </span>
          )}
        </div>

        <div>
          {selectedList.length > 0 && (
            <div>
              {selectedList.map(({ dataId, label }) => (
                <button key={dataId} name={String(dataId)} onClick={removeItem}>
                  {label} &times;
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {whichOneFocusedPretty}/{originalItemNumber}
        </div>

        <SItemGrid>
          <SButton onClick={focusPrev}>Prev</SButton>
          <div>
            {list.map(
              (
                {
                  backgroundImage,
                  dataId,
                  description,
                  label,
                  id,
                  textColour,
                  checked,
                },
                key,
              ) => (
                <RotatingItem
                  key={id}
                  id={id}
                  angle={
                    arr.includes(key)
                      ? arr.indexOf(key) - howManyLeftAndRight + 1
                      : 12
                  }
                  textColour={textColour}
                  backgroundImage={backgroundImage}
                  dataId={dataId}
                  description={description}
                  label={label}
                  onChange={onChange}
                  onFocus={onFocus}
                  checked={checked}
                  focused={lastFocused === `rotating-item-selector-${id}`}
                />
              ),
            )}
          </div>
          <SButton onClick={focusNext}>Next</SButton>
        </SItemGrid>
      </SRotatingCarousel>
      <div>
        <button>Lorem, ipsum.</button>
        <button>Asperiores, ut.</button>
        <button>Nisi, iusto!</button>
      </div>
    </div>
  )
}
