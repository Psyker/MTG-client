import { TweenLite } from 'gsap'
import { getRelativeTranslationToLeft } from './utils'

export const scaleAndTransform = ($el, duration = .5) => {
  return new Promise(resolve => {
    const translate = getRelativeTranslationToLeft($el)
    const oldTransition = $el.style.transition
    TweenLite.set($el, {transition: 'none'})
    TweenLite.to($el, duration, {
      zIndex: 100,
      transformOrigin: 'left center',
      transform: `translate(${translate.x}px, ${translate.y}px) scale(1.5)`
    }).eventCallback('onComplete', () => {
      $el.style.style = oldTransition
      resolve()
    })
  })
}

export const disapear = ($el, delay = 0, duration = .2) => {
  return TweenLite.to($el, duration, {
    opacity: 0,
    visibility: 'hidden'
  }).delay(delay)
}
