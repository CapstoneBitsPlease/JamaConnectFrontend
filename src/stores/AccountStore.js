import { action, thunk, persist } from "easy-peasy";
import axios from "axios";
import makeToast from "../components/Toaster";

const accountStore = persist(
  {
    loggedIn: false,
    token: null,
    login: thunk((actions, userInfo) => {
      axios
        .post(
          `http://127.0.0.1:5000/login/jama/basic?username=${userInfo.userName}&password=${userInfo.password}&organization=${userInfo.organization}`
        )
        .then((reponse) => {
          makeToast("success", "User has been authenticated");
          actions.setToken(reponse.data.access_token);
          actions.setLoggedIn(true);
        })
        .catch(() => {
          makeToast("error", "Invalid login");
        });
    }),

    setLoggedIn: action((state, newLoggedIn) => {
      state.loggedIn = newLoggedIn;
    }),
    setToken: action((state, newToken) => {
      state.token = newToken;
    }),
  },
  {
    storage: "localStorage",
  }
);

export default accountStore;
