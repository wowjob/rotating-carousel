import { useEffect, useReducer, useRef } from 'react'
import type { ChangeEvent, FocusEvent, MouseEvent, TouchEvent } from 'react'
import {
  SAction,
  SButton,
  SCurrent,
  SItemGrid,
  SRemoveButton,
  SRotatingCarousel,
  SRotatingInfo,
  SRotatingMainTitle,
  SSelected,
} from './rotating-carousel.style'
import {
  initialValue,
  rotatingCarouselReducer,
} from './rotating-carousel.reducer'
import { A } from './rotating-carousel.action'
import { generateSequence } from '../../util'
import { Button, RotatingItem } from '..'

export const RotatingCarousel = () => {
  const rotatingCarouselRef = useRef(null)
  const swipeData = useRef({
    startX: 0,
    endX: 0,
  })

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
    maxSelectedText,
    currentSelectedJoinText,
    mainTitle,
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

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    // Set the start position of the swipe
    swipeData.current.startX = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    // Set the end position of the swipe
    swipeData.current.endX = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (swipeData.current.startX - swipeData.current.endX > 100) {
      // If the difference in the start and end position is more than 100px, consider it a swipe
      focusNext()
    } else if (swipeData.current.endX - swipeData.current.startX > 100) {
      focusPrev()
    }
  }

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

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    console.log(name)
  }

  return (
    <div>
      <SRotatingCarousel
        ref={rotatingCarouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        $backgroundImage={list[whichOneFocused + 1].backgroundImage || ''}
      >
        <SRotatingMainTitle>{mainTitle}</SRotatingMainTitle>

        <SRotatingInfo>
          <span>{maxSelectedText}</span>
          {selectedList.length > 0 && (
            <span>
              {' '}
              ({selectedList.length}/{maxSelected})
            </span>
          )}
        </SRotatingInfo>

        <SSelected>
          {selectedList.length > 0 &&
            selectedList.map(({ dataId, label }) => (
              <SRemoveButton
                key={dataId}
                name={String(dataId)}
                onClick={removeItem}
              >
                {label}
              </SRemoveButton>
            ))}
        </SSelected>

        <SCurrent>
          {whichOneFocusedPretty}
          {currentSelectedJoinText}
          {originalItemNumber}
        </SCurrent>

        <SItemGrid>
          <SButton
            aria-label="previous item"
            $direction="left"
            onClick={focusPrev}
          />
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
                  itemImage,
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
                  backgroundImage={itemImage}
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

          <SButton
            aria-label="next item"
            $direction="right"
            onClick={focusNext}
          />
        </SItemGrid>

        <SAction>
          <Button name="next" onClick={onClick} theme="full">
            Next
          </Button>

          <Button name="prev" onClick={onClick} theme="outlined">
            Prev
          </Button>

          <Button name="skip" onClick={onClick} theme="text">
            Skip
          </Button>
        </SAction>
      </SRotatingCarousel>
    </div>
  )
}
