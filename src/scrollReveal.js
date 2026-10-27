export function observeScrollReveals(elements) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motion.matches || !window.IntersectionObserver) return () => {}

  const animations = new Set()
  let stopped = false
  const observer = new window.IntersectionObserver(entries => {
    if (stopped) return
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting || target.dataset.revealed) continue
      target.dataset.revealed = 'true'
      observer.unobserve(target)
      if (!target.animate || target.contains(target.ownerDocument.activeElement)) continue
      const animation = target.animate([
        { opacity: 0, translate: '0 24px' },
        { opacity: 1, translate: '0 0' },
      ], { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
      animations.add(animation)
      const forget = () => animations.delete(animation)
      animation.finished.then(forget, forget)
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

  // Keep content visible by default; animate only when the browser reports entry.
  elements.forEach(element => {
    if (!element.dataset.revealed) observer.observe(element)
  })
  const stop = () => {
    stopped = true
    observer.disconnect()
    animations.forEach(animation => animation.cancel())
    animations.clear()
  }
  motion.addEventListener('change', stop)
  return () => {
    motion.removeEventListener('change', stop)
    stop()
  }
}
