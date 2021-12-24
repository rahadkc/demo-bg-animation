import { useEffect, useState } from 'react'

export const useIsInView = (elRef, offset = 0) => {
  const [inView, setInView] = useState(true)
  const [lastYPos, setLastYPos] = useState(0)
  const [scrollUp, setScrollUp] = useState(false)
  const [offsetFromTop, setEleOffsetTop] = useState(0)


  useEffect(() => {
    const elOffsetTop = elRef.current?.offsetTop
    const el = elRef.current?.getBoundingClientRect()
    const topTo = elOffsetTop + el?.height
    const vH = window.innerHeight
    console.log('el?.height :>> ', el?.height);
    
    function handleScroll() {
      const yPos = window.scrollY
      const isInView = ((lastYPos < topTo) && ((el.y + offset) < vH)) 
      const disFromTop = elOffsetTop - yPos
      const isScrollingUp = yPos < lastYPos
      setInView(isInView)
      setLastYPos(yPos)
      setScrollUp(isScrollingUp)
      setEleOffsetTop(disFromTop)
    }
    
    window.addEventListener('scroll', handleScroll, false)
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [elRef, offset, lastYPos])

  return {inView, scrollUp, lastYPos, offsetFromTop}
}

export default useIsInView