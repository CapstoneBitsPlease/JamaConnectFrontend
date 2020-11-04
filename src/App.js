import React from "react";
import { useStoreState } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Login } from "./pages";
import {
  SelectItem,
  SyncSettings,
  SyncFields,
  SyncFieldsOnCreateIssue,
  LinkFields,
} from "./domains";

const Test = () => {
  const loginState = useStoreState((state) => state.accountStore.loggedIn);
  let location = useLocation();
  console.log(location.pathname);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      {loginState ? (
        <React.Fragment>
          <Route path="/selectItem" component={SelectItem} />
          <Route path="/syncSettings" component={SyncSettings} />
          <Route path="/syncFields" component={SyncFields} />
          <Route
            path="/syncFieldsOnCreateIssue"
            component={SyncFieldsOnCreateIssue}
          />
          <Route path="/linkFields" component={LinkFields} />
        </React.Fragment>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
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
