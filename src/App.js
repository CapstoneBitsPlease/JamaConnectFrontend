import React from "react";
import { useStoreState, useStoreRehydrated } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import {
  SelectItem,
  SelectItemunlink,
  SyncSettings,
  LinkFields,
} from "./pages";
import { Login } from "./pages";
import { Navigation } from "components";
import {JiraIssueContent} from "../src/components"
const Test = () => {
  const loggedIn = useStoreState((state) => state.accountStore.loggedIn);
  const checkjamaid = useStoreState((state => state.jamaitem.checkjamaID))
  const checkjiraid = useStoreState((state => state.jamaitem.checkjamaID))
  const checkjamaidlink = useStoreState((state => state.jamaitem.checkjiraIDlink))
  const checkjiraidlink = useStoreState((state => state.jamaitem.checkjiraIDlink))
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
          { checkjamaidlink && checkjiraidlink ? <Redirect to="/linkFields" /> : <SelectItem />}
        </Route>
        <Route path="/linkFields">
          {!loggedIn ? <Redirect to="/login" /> : <LinkFields />}
        </Route>
        <Route path="/syncSettings">
          {!loggedIn ? <Redirect to="/login" /> : <SyncSettings />}
        </Route>
        <Route path="/selectItemNoNav">
          {!loggedIn ? <Redirect to="/login" /> : <JiraIssueContent/>}
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
