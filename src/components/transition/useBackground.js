// import { SEC_EIGHT, SEC_FIVE, SEC_FOUR, SEC_NINE, SEC_SEVEN, SEC_SIX, SEC_THREE, SEC_TWO } from './constants';

import { getStyle } from "./utils";

const defaultColor = '#ebfaff'
// function getStyle(key) {
//     // console.log('key :>> ', key);
//     let bg = ''
//     let width = 50
//     switch (key) {
//         case SEC_TWO:
//             bg = 'url("/static/media/about-bg.62489103.svg") center center / cover no-repeat'
//             width = 100
//             break;
//         case SEC_THREE:
//             bg = 'url("/static/media/service.7cc04292.svg") center center / cover no-repeat'
//             width = 50
//             break;
//         case SEC_FOUR:
//             bg = '#ebfaff'
//             width = 100
//             break;
//         case SEC_FIVE:
//             bg = '#fff'
//             width = 50
//             break;
//         case SEC_SIX:
//             bg = '#ebfaff'
//             width = 50
//             break;
//         case SEC_SEVEN:
//             bg = 'url(/static/media/horizon.5c5d8899.svg) no-repeat center center/cover'
//             width = 50
//             break;
//         case SEC_EIGHT:
//             bg = 'linear-gradient(0deg, #ebfaff, #ebfaff)'
//             width = 50
//             break;
//         case SEC_NINE:
//             bg = 'background: url("/static/media/footer.f8f95b3c.svg") center center / cover no-repeat'
//             width = 50
//             break;
//         default:
//             bg = defaultColor
//             width = 50
//             break;
//     }

//     return {bg, width}
    
// }


const useBackground = ({ offsetToTop, section, offsetTopList}) => {
    // console.log('offsetTopList in bg :>> ', offsetTopList);
    const bg = offsetToTop < 1 ?  defaultColor : getStyle[section]
    return {bg}   
}

export default useBackground