import { action } from "easy-peasy";

const jamaitem = {
  itemID: 1,
  jiraID : false,
  setitemID: action((state, newID)=>{
    state.itemID = newID;
    state.jiraID = true;
  })
};

export default jamaitem;