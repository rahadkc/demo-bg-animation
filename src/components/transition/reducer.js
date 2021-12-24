import { SEC_ONE, SET_IN_VIEW, SET_OFFSET_TOP, SET_OFFSET_TOP_LIST, UPDATE_OFFSET_TOP_LIST } from "./constants";

const init = {
    inViewSection: SEC_ONE,
    offsetTopList: [],
    offsetToTop: 0,
};

const transitionReducers = (state = init, action) => {
  switch (action.type) {
    case SET_OFFSET_TOP: {
      return {
        ...state,
        offsetToTop: action.payload,
      };
    }
    case SET_OFFSET_TOP_LIST: {
      return {
        ...state,
        offsetTopList: [...state.offsetTopList, action.payload],
      };
    }
    case  UPDATE_OFFSET_TOP_LIST:  {
        const index = state.offsetTopList.findIndex(todo => todo.id === action.payload.id); //finding index of the item
        let newArray = [...state.offsetTopList]; //making a new array
        // console.log('index :>> ', index);
        newArray[index].height = action.payload.height
        newArray[index].topTo = action.payload.topTo
        // if(index !== -1) {
        //     newArray = newArray.map(item => item.id === action.payload.id  ? {...item, height: item.height} : item)
        // } else {
        //     newArray = [...state.offsetTopList, action.payload]
        // }
        return {
            ...state,
            offsetTopList: newArray
        }
    }
    case SET_IN_VIEW: {
      return {
        ...state,
        inViewSection: action.payload,
      };
    }

    default:
      return state;
  }
};
export default transitionReducers;
