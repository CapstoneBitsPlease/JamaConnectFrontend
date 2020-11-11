import React, { useState } from "react";
import { useStoreState, useStoreRehydrated } from "easy-peasy";
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
  const loggedIn = useStoreState((state) => state.accountStore.loggedIn);
  const location = useLocation();
  const noNav = location.pathname.includes("NoNav");

  return (
    <>
      {!noNav && loggedIn && <Navigation />}

      <Switch>
        <Route path="/login">
          {loggedIn ? <Redirect to="/selectItem" /> : <Login />}
        </Route>
        <Route path="/selectItem">
          {!loggedIn ? <Redirect to="/login" /> : <SelectItem />}
        </Route>
        <Route path="/syncSettings">
          {!loggedIn ? <Redirect to="/login" /> : <SyncSettings />}
        </Route>
        <Route path="/syncFields">
          {!loggedIn ? <Redirect to="/login" /> : <SyncFields />}
        </Route>
        <Route path="/syncFieldsOnCreateIssue">
          {!loggedIn ? <Redirect to="/login" /> : <SyncFieldsOnCreateIssue />}
        </Route>
        <Route path="/linkFields">
          {!loggedIn ? <Redirect to="/login" /> : <LinkFields />}
        </Route>
        <Route path="/selectItemNoNav">
          {!loggedIn ? <Redirect to="/login" /> : <SelectItem />}
        </Route>
      </Switch>
    </>
  );
};

const App = () => {
  const isRehydrated = useStoreRehydrated();

  return <Router>{isRehydrated ? <Test /> : "Loading"}</Router>;
};
export default App;
