export const generateSequence = (
  lastFocusedIndex: number,
  totalItems: number,
  sequenceLength: number,
) => {
  let sequence = []
  for (let i = 0; i < sequenceLength; i++) {
    sequence.push(
      (lastFocusedIndex + i - (sequenceLength - 7) + totalItems) % totalItems,
    )
  }
  return sequence
}
