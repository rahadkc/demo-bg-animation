// import { SEC_EIGHT, SEC_FIVE, SEC_FOUR, SEC_NINE, SEC_SEVEN, SEC_SIX, SEC_THREE, SEC_TWO } from "./constants"

import { SEC_ONE, SEC_TWO } from "./constants"

export function getBgWidth(sections) {
    return sections?.map((_s, i) => {
        // console.log('_s, i :>> ', _s, i);
      if(i === 0) {
        return {
          ..._s,
          start: 33.6,
          end: 0,
          diff: 33.6
          
        }
      }
      if(i === 1) {
        return {
          ..._s,
          start: 0,
          end: 54.2,
          diff: 54.2
        }
      }
      if(i === 2) {
        return {
          ..._s,
          start: 54.2,
          end: 0,
          diff: 54.2
        }
      }
    //   if(i === 3) {
    //     return {
    //       ..._s,
    //       start: 0,
    //       end: 0,
    //       diff: 0
    //     }
    //   }
      if(i === 4) {
        return {
          ..._s,
          start: 0,
          end: 58, //old value 56.9 all similar
          diff: 58,
          reverse: true
        }
      }
      if(i === 5) {
        return {
          ..._s,
          start: 58,
          end: 0,
          diff: 58,
          reverse: true
        }
      }
      if(i === 3 || i === 6 || i === 7 || i === 8) {
        return {
          ..._s,
          start: 0,
          end: 0,
          diff: 0
        }
      }
    //   if(i === 7) {
    //     return {
    //       ..._s,
    //       start: 0,
    //       end: 0,
    //       diff: 0
    //     }
    //   }
      return _s
    })
}

export function getScrolledSection(sections = []) {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let sectionHeight;
    let scrolled;
    let currentSection = ''
    // console.log('document.documentElement.scrollHeight - document.documentElement.clientHeight; :>> ', document.documentElement.scrollHeight , document.documentElement.clientHeight);
    // if(sections) {
  
      if(winScroll >= sections[0]?.topTo &&  winScroll <= sections[1]?.height) {
        sectionHeight = sections[0].height
        scrolled = (winScroll / sectionHeight) * 100;
        currentSection = 0
      }
      if(winScroll > sections[1]?.topTo && winScroll <= sections[2]?.topTo) {
        sectionHeight = sections[1]?.height
        scrolled = ((winScroll - sections[1]?.topTo) / sectionHeight) * 100;
        currentSection = 1
      }
      if(winScroll > sections[2]?.topTo && winScroll <= sections[3]?.topTo) {
        sectionHeight = sections[2]?.height
        scrolled = ((winScroll - sections[2]?.topTo) / sectionHeight) * 100;
        currentSection = 2
      }
      if(winScroll > sections[3]?.topTo && winScroll <= sections[4]?.topTo) {
        sectionHeight = sections[3]?.height
        scrolled = ((winScroll - sections[3]?.topTo) / sectionHeight) * 100;
        currentSection = 3
      }
      if(winScroll > sections[4]?.topTo && winScroll <= sections[5]?.topTo) {
        sectionHeight = sections[4]?.height
        scrolled = ((winScroll - sections[4]?.topTo) / sectionHeight) * 100;
        currentSection = 4
      }
      if(winScroll > sections[5]?.topTo && winScroll <= sections[6]?.topTo) {
        sectionHeight = sections[5]?.height
        scrolled = ((winScroll - sections[5]?.topTo) / sectionHeight) * 100;
        currentSection = 5
      }
      if(winScroll > sections[6]?.topTo && winScroll <= sections[7]?.topTo) {
        sectionHeight = sections[6]?.height
        scrolled = ((winScroll - sections[6]?.topTo) / sectionHeight) * 100;
        currentSection = 6
      }
      if(winScroll > sections[7]?.topTo && winScroll <= sections[8]?.topTo) {
        sectionHeight = sections[7]?.height
        scrolled = ((winScroll - sections[7]?.topTo) / sectionHeight) * 100;
        currentSection = 7
      }
      if(winScroll > sections[8]?.topTo) {
          console.log('called :>> section 8 ');
        sectionHeight = sections[8]?.height
        scrolled = ((winScroll - sections[8]?.topTo) / sectionHeight) * 100;
        currentSection = 8
      }
    // }
    // console.log(winScroll, 'winScroll << >> sectionHeight :>> ', sectionHeight);
  
    // scrolled = (winScroll / sectionHeight) * 100;
  
    return {currentSection, winScroll, scrolled: scrolled || 0}
  }

//   export const getStyle = {
//     // console.log('key :>> ', key); {
//         SEC_ONE: '#ebfaff',
//         SEC_TWO: 'url("/static/media/about-bg.62489103.svg") center center / cover no-repeat',
           
//         SEC_THREE: 'url("/static/media/service.7cc04292.svg") center center / cover no-repeat',
           
//         SEC_FOUR: '#ebfaff',
           
//         SEC_FIVE: '#fff',
           
//         SEC_SIX: '#ebfaff',
           
//         SEC_SEVEN: 'url("/static/media/horizon.5c5d8899.svg") no-repeat center center/cover',
           
//         SEC_EIGHT: 'linear-gradient(0deg, #ebfaff, #ebfaff)',
           
//         SEC_NINE: 'url("/static/media/footer.f8f95b3c.svg") center center / cover no-repeat' 
//     }

    export const getStyle = [
        // console.log('key :>> ', key); {
             '#ebfaff',
     'url("/static/media/about-bg.62489103.svg") center center / cover no-repeat',
               
             'url("/static/media/service.7cc04292.svg") center center / cover no-repeat',
               
            '#ebfaff',
               
         '#fff',
               
     '#ebfaff',
     'url(/static/media/horizon.5c5d8899.svg) no-repeat center center/cover no-repeat',
     
     'linear-gradient(0deg, #ebfaff, #ebfaff)',
     
     'url("/static/media/footer.f8f95b3c.svg") center center / cover no-repeat' 
    ]
    // 'url(/static/media/horizon.5c5d8899.svg) no-repeat center center/cover',
    // 'linear-gradient(160deg, rgb(119, 125, 239) 0%, rgb(162, 204, 216) 100%',    


 export function getBackground(winScroll, offsetToplist) {
        let bg = ''


        if(winScroll <= 100) {
            bg = getStyle[0]
        } else if (winScroll > 100 && winScroll <= offsetToplist[1]?.topTo  + 100) {
            bg = getStyle[1]

        }else if (winScroll > offsetToplist[1]?.topTo  && winScroll <=  offsetToplist[2]?.topTo + 100) {
            bg = getStyle[2]

        }else if (winScroll > offsetToplist[2]?.topTo  && winScroll <=  offsetToplist[3]?.topTo + 100 ) {
            bg = getStyle[3]

        }else if (winScroll > offsetToplist[3]?.topTo  && winScroll <=  offsetToplist[4]?.topTo + 100 ) {
            bg = getStyle[4]

        }else if (winScroll > offsetToplist[4]?.topTo  && winScroll <=  offsetToplist[5]?.topTo + 100 ) {
            bg = getStyle[5]

        }else if (winScroll > offsetToplist[5]?.topTo  && winScroll <=  offsetToplist[6]?.topTo + 100 ) {
            bg = getStyle[6]

        }else if (winScroll > offsetToplist[6]?.topTo  && winScroll <=  offsetToplist[7]?.topTo + 100 ) {
            bg = getStyle[7]

        }else {
            bg = getStyle[8]

        } 

        return bg
    }