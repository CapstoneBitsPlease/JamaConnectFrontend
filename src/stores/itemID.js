import { action } from "easy-peasy";

const jamaitem = {
  itemID: 0,
  jiraID: 0,
  progname: '',
  progID: 0,
  itemname : '',
  itemtype: '',
  checkjamaID : false,
  checkjiraID : false,
  checklinking : false,
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
  checkjamaID: action(( state , newID) => {
    state.checkjamaID = newID;
  }),
  checkjiraID: action(( state , newID1) => {
    state.checkjiraID = newID1;
  }),
  checklinkingpage: action(( state , newID4) => {
    state.checklinking = newID4;
  })
};

export default jamaitem;