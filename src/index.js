import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, StoreProvider } from "easy-peasy";
import { jamaitem } from "./stores";
import { accountStore, syncStore, linkStore } from "./stores";

const store = createStore({
  accountStore: accountStore,
  jamaitem: jamaitem,
  syncStore: syncStore,
  linkStore: linkStore,
});

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
