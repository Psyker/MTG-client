export const getRelativeTranslationToLeft = ($el, offset = 300) => {
  const rect = $el.getBoundingClientRect()
  const height = window.innerHeight
  const x = -($el.offsetLeft - offset)
  const y = ((height / 2) - (rect.height / 2) - $el.offsetTop) + window.scrollY

  return {x, y}
}
