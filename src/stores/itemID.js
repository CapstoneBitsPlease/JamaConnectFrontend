import { action } from "easy-peasy";

const jamaitem = {
  itemID: 0,
  jiraID: 0,
  progname: '',
  progID: 0,
  itemname : '',
  itemtype: '',
  setitemID: action((state, newID)=>{
    state.itemID = newID;
  }),
  setjiraID: action((state, newjiraID) => {
    state.jiraID = newjiraID;
  }),
  setprogname: action((state, newprogname) => {
    state.progname = newprogname;
  }),
  setprogID: action((state, newprogID) => {
    state.progID = newprogID;
  }),
  setitemname: action((state, newitemname) => {
    state.itemname = newitemname;
  }),
  setitemtype: action((state, newitemtype) => {
    state.itemtype = newitemtype;
  }),
};

export default jamaitem;