import React, { useEffect, useState } from 'react';
import { SEC_ONE } from './constants';
// import { useSelector } from 'react-redux';
// import { SEC_FIVE, SEC_FOUR, SEC_ONE, SEC_SIX, SEC_THREE, SEC_TWO } from './constants';
// import useBackground from './useBackground';
// import { getBgWidth, getScrolledSection } from './utils';
import "./style.scss";
import useBackgrounStyle from './useBackgrounStyle';


const Transition = () => {
    const {currentBg, currentWidth, scrollOpacity, section} = useBackgrounStyle()
    // console.log('SEC_ONE :>> ', SEC_ONE, section);
//     const {offsetToTop, inViewSection, offsetTopList} = useSelector(state => ({
//         offsetToTop: state.anim.offsetToTop,
//         inViewSection: state.anim.inViewSection,
//         offsetTopList: state.anim.offsetTopList,
//     }))
//     console.log('offsetToTop :>> ', offsetToTop);
//     const {bg} = useBackground({ offsetToTop, section: inViewSection, offsetTopList})
//     const [currentWidth, setCurrentWidth] = useState(30); // using myFunction only
//     const getSections = getBgWidth(offsetTopList)
//     const progressWidth = () => {
//         if(getSections) {
//             return getScrolledSection(getSections)
//         }
//     }
  
//     const [currentBg, setCurrentBg] = useState(bg);
//   const {scrolled: scrollValue, currentSection } = progressWidth()

//   const section = getSections[currentSection]


//     useEffect(() => {
//         setCurrentBg(bg)
//       }, [bg]);
    
//     //   useEffect(() => {
//     //     let elemH; 
//     //     if(inViewSection === SEC_ONE) {
//     //       elemH = offsetTopList[0]?.height
//     //     } else if (inViewSection === SEC_TWO) {
//     //       elemH = offsetTopList[1]?.height
//     //     } else if (inViewSection === SEC_THREE) {
//     //       elemH = offsetTopList[2]?.height
//     //     } else if (inViewSection === SEC_FOUR) {
//     //       elemH = offsetTopList[3]?.height
//     //     } else if (inViewSection === SEC_FIVE) {
//     //       elemH = offsetTopList[4]?.height
//     //     } else if (inViewSection === SEC_SIX) {
//     //       elemH = offsetTopList[5]?.height
//     //     }
//     //     setElemHeight(elemH)
//     //     // setLastValue(currentWidth)
//     //   }, [offsetTopList, inViewSection])
    
//       useEffect(() => {
//           const _startPoint = section?.start
//           const _diff = section?.diff
//         // const newWidth = currentWidth
//         // console.log('lastValue :>> ', lastValue);
//         // const _w = section?.start === 100 ? section?.start - (((100 - section?.start) / 100)  *  progressWidth) : section?.start + (((100 - section?.start) / 100)  *  progressWidth)
//         const _w = _startPoint === 0 ? _startPoint + (_diff/100 * scrollValue) : _startPoint - (_diff/100 * scrollValue)
//         // console.log('_w :>> ', _w);
//         setCurrentWidth(_w)
//       }, [progressWidth])
const style = {
    left: `${section?.reverse ? currentWidth : 0}%`, 
    right: `${section?.reverse ? 0 : currentWidth}%`, 
    opacity: scrollOpacity,
    background: currentBg,
    transition: 'all 0.3s linear'
}
   

    return (
        <div>
            <div style={style} className="bgItem"></div>
        </div>
    );
}

export default Transition