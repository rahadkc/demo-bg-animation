import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useIsInView from './useIsInView';
// import useBackground from './useBackground';
import { getBackground, getBgWidth, getScrolledSection, getStyle } from './utils';

const defaultColor = '#ebfaff'


const useBackgrounStyle = () => {
    const {offsetToTop, inViewSection, offsetTopList} = useSelector(state => ({
        offsetToTop: state.anim.offsetToTop,
        inViewSection: state.anim.inViewSection,
        offsetTopList: state.anim.offsetTopList,
    }))
    // console.log('offsetToTop :>> ', getStyle[inViewSection], offsetToTop);
 
    // const {bg} = useBackground({ offsetToTop, section: inViewSection, offsetTopList})
    // console.log(offsetToTop, 'bacground :>> ', bg);
    const [currentWidth, setCurrentWidth] = useState(30); // using myFunction only
    const getSections = getBgWidth(offsetTopList)
    const progressWidth = () => {
        if(getSections) {
            return getScrolledSection(getSections)
        }
    }
    
    const [currentBg, setCurrentBg] = useState('');
    const {scrolled: scrollValue, winScroll, currentSection } = progressWidth()
    const bg = offsetToTop < 1 ?  defaultColor : getStyle[inViewSection]
    const _bg = getBackground(winScroll, offsetTopList)
    const scrollOpacity = winScroll < 100 ? 1 : .5 + scrollValue/200
// console.log(_bg, 'bg winScroll scrollValue, currentSection :>> ', scrollValue, currentSection);
  const section = getSections[currentSection]


    useEffect(() => {
        setCurrentBg(_bg)
      }, [_bg]);
    

    
      useEffect(() => {
          const _startPoint = section?.start
          const _diff = section?.diff
       
        const _w = _startPoint === 0 ? _startPoint + (_diff/100 * scrollValue) : _startPoint - (_diff/100 * scrollValue)
        // console.log(scrollValue,'_w :>> ', _w);
        setCurrentWidth(_w)
      }, [progressWidth])

    return {currentWidth, currentBg: _bg, scrollOpacity, section}
}

export default useBackgrounStyle 