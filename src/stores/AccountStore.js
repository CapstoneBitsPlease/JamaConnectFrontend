import { action, thunk } from "easy-peasy";
import axios from "axios";
import makeToast from "../Toaster";

const accountStore = {
  loggedIn: false,
  login: thunk((actions, userInfo) => {
    axios
      .post(
        `http://127.0.0.1:5000/login/jama/basic?username=${userInfo.userName}&password=${userInfo.password}&organization=${userInfo.organization}`
      )
      .then(() => {
        makeToast("success", "User has been authenticated");
        actions.setLoggedIn(true)
      })
      .catch(() => {
        makeToast("error", "Invalid login");
      });
  }),

  setLoggedIn: action((state, newLoggedIn)=>{
    state.loggedIn = newLoggedIn;
  })
};

export default accountStore;