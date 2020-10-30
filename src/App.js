import React from "react";
import { useStoreState } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "./pages";
import { SelectItem, SyncSettings, SyncFields, SyncFieldsOnCreateIssue, LinkFields } from "./components";

function App() {
  const loginState = useStoreState((state) => state.accountStore.loggedIn);
  return (
      <Router>
        <Switch>
          <Route path="/" exact>
            {loginState ? <Redirect to="/selectItem" /> : <Login />}
          </Route>
          <Route path="/selectItem" exact>
            {!loginState ? <Redirect to="/" /> : <SelectItem />}
          </Route>
          <Route path ="/syncSettings" component={SyncSettings} exact />
          <Route path ="/syncFields" component={SyncFields} exact />
          <Route path ="/syncFieldsOnCreateIssue" component={SyncFieldsOnCreateIssue} exact />
          <Route path ="/linkFields" component={LinkFields} exact />
        </Switch>
      </Router>
  )
}
export default App;
