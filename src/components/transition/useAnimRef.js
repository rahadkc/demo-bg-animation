import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEC_ONE, SET_IN_VIEW, SET_OFFSET_TOP, SET_OFFSET_TOP_LIST, UPDATE_OFFSET_TOP_LIST } from './constants';
import useIsInView from './useIsInView';
import useSize from './useSize';
import useResizeObserver from "use-resize-observer";


console.log('called :>> ');
const noop = (n) => n;


const useAnimRef = ({  id, section = SEC_ONE }) => {
  const elRef = useRef()
//   const size = useSize(elRef)
 const {  width = 1, height = 1 } = useResizeObserver({
     ref: elRef,
    box: "border-box",
    round: noop
  });
  //   console.log('size :>> ', section,  size?.height+size?.top+size?.y, size?.y);
  const offsetTopList  = useSelector(state => state.anim.offsetTopList)
  const filtered = offsetTopList.sort((a, b) => a.id - b.id)
  const [viewedSec, setViewedSec] = useState([])
  const winHeight = document.documentElement.scrollHeight
//   console.log('filtered :>> ', filtered,  id, section,  height);
//   const [sec_ids, setSecId] = useState(offsetTopList)
//   const sec_ids = 
//   console.log('sec_ids :>> ', sec_ids);

    const dispatch = useDispatch()

    const {inView, lastYPos, offsetFromTop } = useIsInView(elRef, 0)
    // const {setValue, setOffset, setOffsetTopList} = useAnimContext()
    // console.log(elRef?.current?.offsetHeight, 'lastYPos :>> ', document.documentElement.scrollHeight);
    useEffect(() => {
    if(offsetTopList.findIndex(item => item.id === id) !== -1) {

            dispatch({ type: UPDATE_OFFSET_TOP_LIST, payload: { id, section, height: elRef?.current?.offsetHeight, topTo: elRef?.current?.offsetTop }})
        } else {
            dispatch({ type: SET_OFFSET_TOP_LIST, payload: { id, section, height: elRef?.current?.offsetHeight, topTo: elRef?.current?.offsetTop }})
        }
    }, [winHeight, ])

    // useEffect(() => {
    //     if(offsetTopList.findIndex(item => item.id === id) !== -1) {

    //         dispatch({ type: UPDATE_OFFSET_TOP_LIST, payload: { id, section, height, topTo: offsetFromTop }})
    //     } else {
    //         dispatch({ type: SET_OFFSET_TOP_LIST, payload: { id, section, height, topTo: offsetFromTop}})
    //     }
    //     // if(!sec_ids.includes(id)) {
    //     //     setSecId(prev => [...prev, id])
    //     // } else {
    //     //     dispatch({ type: UPDATE_OFFSET_TOP_LIST, payload: { id, section, height}})
    //     // }
    // }, [id, height, offsetFromTop])
    // useEffect(() => {
    //     dispatch({ type: SET_OFFSET_TOP_LIST, payload: { id, section, height}})
    // }, [])
    // console.log('offsetFromTop :>> ', offsetFromTop);
    useEffect(() => {
       
        if(inView && lastYPos > 0)  {
            dispatch({ type: SET_IN_VIEW, payload: section })
        }
    }, [inView, section])

    useEffect(() => {
        // console.log(viewedSec, 'inView :>> ', inView);
        if(inView && lastYPos > 0  && !viewedSec.includes(section) || (section === SEC_ONE && !viewedSec.includes(section))) {
            setViewedSec(prev => [...prev, section])
            // dispatch({ type: SET_OFFSET_TOP_LIST, payload: {topTo: elRef?.current?.offsetTop, offsetHeight: elRef?.current?.offsetHeight, height: elRef?.current?.clientHeight} })
        }
    }, [inView])


    useEffect(() => {
        if(offsetFromTop === 0) {
            dispatch({ type: SET_IN_VIEW, payload: SEC_ONE })
        }

        // setOffset(offsetFromTop)
        dispatch({ type: SET_OFFSET_TOP, payload: offsetFromTop })

    }, [offsetFromTop])

    // console.log('elRef?.current?.offsetHeight :>> ', elRef?.current?.offsetHeight, section);
    useEffect(() => {
        window.addEventListener('DOMContentLoaded', (event) => {
            console.log('DOM fully loaded and parsed');
        });
        // dispatch({ type: SET_OFFSET_TOP_LIST, payload: {topTo: elRef?.current?.offsetTop, offsetHeight: elRef?.current?.offsetHeight, height: elRef?.current?.clientHeight} })
        // setOffsetTopList(prev => [...prev, {topTo: elRef?.current?.offsetTop, offsetHeight: elRef?.current?.offsetHeight, height: elRef?.current?.clientHeight}])
    }, [])

    return {elRef, inView, lastYPos, offsetFromTop} 
}

export default useAnimRef