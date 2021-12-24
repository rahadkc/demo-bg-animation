import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { childsVariant, parentVariant as parent } from "./framerVariants";
import useIsInView from './useIsInView';

function useDefaultMotion ({ offset, elRef }){
  const controls = useAnimation()
//   const elRef = useRef()
  const { offsetFromTop, scrollUp, inView } = useIsInView(elRef, offset)  
  const childs = (index) => childsVariant(inView, index)
  console.log(offsetFromTop, inView, 'inView offsetFromTop :>> ', inView && offsetFromTop === 0);
// console.log('childs :>> ', childs(2));
  useEffect(() => {
      if(!scrollUp) {
        controls.start("visible")
    }
    return () => {
    }
  }, [controls, inView, offsetFromTop])

  return {inView, controls, motion, parent, childs}
}

export default useDefaultMotion