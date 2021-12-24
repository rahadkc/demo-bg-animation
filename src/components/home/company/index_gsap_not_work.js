import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
// images
import arrow from "../../../assets/images/arrow.svg";
import company1 from "../../../assets/images/company/img1.png";
import company2 from "../../../assets/images/company/img2.png";
import company3 from "../../../assets/images/company/img3.png";
import company4 from "../../../assets/images/company/img4.png";
import company5 from "../../../assets/images/company/img5.png";
import {
  NextArrow,
  PrevArrow,
} from "../../../components/uielements/sliderArrows";
import { SEC_EIGHT } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import useDefaultMotion from "../../transition/useMotion";
import "./style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// import { motion } from "framer-motion";


const companys = [
  {
    id: 1,
    image: company1,
    text: "“Instead of scouring Facebook groups for therapists, I’m finally able to get all of my questions answered in one place.”",
    name: "Kristin Anderson",
    subName: "LCSW",
    color: "#E26262",
  },
  {
    id: 2,
    image: company2,
    text: "“This past year has been difficult, I’m so glad to have found a truly supportive community.”",
    name: "WHO DIS",
    subName: "HLPPLZ",
    color: "#FA8C4E",
  },
  {
    id: 3,
    image: company3,
    text: "“As an Associate Director of a growing group practice, I love that I can connect my colleagues with such useful and impactful information.”",
    name: "Lucas Saiter",
    subName: "LMHC",
    color: "#777DEF",
  },
  {
    id: 4,
    image: company4,
    text: "“I always believed I had to fight so hard to make a living. Being a part of this community reaffirmed my worth and how I approach my work.”",
    name: "Jnee Hill",
    subName: "LSCW",
    color: "#F7B5D5",
  },
  {
    id: 5,
    image: company5,
    text: "“I was close to burnout and feeling drained. This community helped me feel less alone and find direction when I needed it most.”",
    name: "WHO DIS",
    subName: "HLPPLZ",
    color: "#FFCA41",
  },
];


const cardVariants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};


const Company = (props) => {
  gsap.registerPlugin(ScrollTrigger);



  const ulRef = useRef(null)
  const { elRef, inView } = useAnimRef({ section: SEC_EIGHT, id: 7 })
  const { controls, motion, parent, childs } = useDefaultMotion({offset: 0, elRef })

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    className: "companySlider",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const q = gsap.utils.selector(ulRef);
  // const q = gsap.utils.selector(ulRef);
  useEffect(() => {
    const element = elRef?.current;
    // gsap.to(q(".companyWrap1"), { x: 100 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: q(".companyWrap1"),
        start: "top center",
        end: "bottom top",
        scrub: true,
        markers: true
      }
    });
    // gsap.to(ulRef?.current, {
    //   scrollTrigger: ulRef?.current, // start the animation when ".box" enters the viewport (once)
    //   x: 500
    // });

    console.log('inView :>> ', inView);
  //  if(inView) {
    gsap.fromTo(
      q(".companyWrap1"),
      {
        // opacity: 0,
        // scale: 0.2,
        y: 500
      },
      {
        // opacity: 1,
        y: 0,
        // scale: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: q(".joinBtn"),
          start: "top center",
          end: "bottom bottom",
          scrub: true,
          marker: true
        }
      }
    );
  //  }
    // gsap.to(elRef.current, { rotation: "+=360" });
  }, [])

  return (
    <section ref={elRef} className="companyArea"
    // initial="offscreen"
    // whileInView="onscreen"
    // viewport={{ once: false, amount: 0.8 }}
    >
      <div className="companyContainer">
        <div className="companyContent">
          <h2>{props.data?.testimonial_title}</h2>
          <p>{props.data?.testimonial_paragraph}</p>

          <span onClick={props.openSignup} className="joinBtn">
            {props.data?.testimonial_button_title}{" "}
            <img src={arrow} alt="arrow" />
          </span>
        </div>
        <ul ref={ulRef} className="companyitems">
          {props.data?.testimonial?.map((item, i) => (
            <li className={`companyWrap${i + 1}`} key={i}>
              <span
                style={{ border: `7px solid ${item.color}` }}
                className="companyImg"
              >
                <img src={item.icon} alt={item.title} />
              </span>
              <p>{item.paragraph}</p>
              <strong>
                -{item.title.split(",")[0]},{" "}
                <span className="subName">{item.title.split(",")[1]}</span>
              </strong>
            </li>
          ))}
        </ul>

        <div className="d-desktop-none">
          <Slider {...settings}>
            {props.data?.testimonial?.map((item, i) => (
              <div className="companyWrap" key={i}>
                <span
                  style={{ border: `7px solid ${item.color}` }}
                  className="companyImg"
                >
                  <img src={item.icon} alt={item.title} />
                </span>
                <p>{item.paragraph}</p>
                <strong>
                  -{item.title.split(",")[0]},{" "}
                  <span className="subName">{item.title.split(",")[1]}</span>
                </strong>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default Company;
