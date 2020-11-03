import { action } from "easy-peasy";

const jamaitem = {
  itemID: 0,
  setitemID: action((state, newID)=>{
    state.itemID = newID;
  })
};

export default jamaitem;