import { action } from "easy-peasy";

const jamaitem = {
  itemID: 0,
  jiraID: 0,
  test : false,
  setitemID: action((state, newID)=>{
    state.itemID = newID;
  }),
  setjiraID: action((state, newjiraID) => {
    state.jiraID = newjiraID;
  }),
};

export default jamaitem;