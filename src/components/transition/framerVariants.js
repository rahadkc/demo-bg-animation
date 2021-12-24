import metaReducer from "../../store/reducers/metaReducer"

export const parentVariant = {
    hidden: {
      y: 1 
    },
    visible: {
      y: 1,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  }

  const variantType = [500, 375, 250, 125]
  
  export const childsVariant = (isUp, index) => {
    console.log('isUp :>> ', isUp);
    return {
      hidden: { y: -variantType[index] },
      visible: {
        y: isUp ? 1 : -variantType[index],
        transition: {
          duration: 1,
        }
      },
      
    }
  }