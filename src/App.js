import React from "react";
import { useStoreState } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  Link,
} from "react-router-dom";
import {
  SelectItem,
  SyncSettings,
  SyncFields,
  SyncFieldsOnCreateIssue,
  LinkFields,
} from "./domains";
import { Login } from "./pages";

import { Navigation } from "components";
const Test = () => {
  const loginState = useStoreState((state) => state.accountStore.loggedIn);
  let location = useLocation();
  console.log(location.pathname);

  return (
    <Router>
      {/* {loginState ? <Navigation /> : <Login />} */}
      <Switch>
        <Route path="/login">
          {loginState ? <Redirect to="/selectItem" /> : <Login />}
        </Route>
        <Route path="/selectItem">
          {!loginState ? <Redirect to="/login" /> : <SelectItem />}
        </Route>
        <Route path="/syncSettings">
          {!loginState ? <Redirect to="/login" /> : <SyncSettings />}
        </Route>
        <Route path="/syncFields">
          {!loginState ? <Redirect to="/login" /> : <SyncFields />}
        </Route>
        <Route path="/syncFieldsOnCreateIssue">
          {!loginState ? <Redirect to="/login" /> : <SyncFieldsOnCreateIssue />}
        </Route>
        <Route path="/linkFields">
          {!loginState ? <Redirect to="/login" /> : <LinkFields />}
        </Route>
        <Route path="/selectItemNoNav">
          {!loginState ? <Redirect to="/login" /> : <SelectItem />}
        </Route>
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <Router>
      <Test />
    </Router>
  );
}
export default App;
