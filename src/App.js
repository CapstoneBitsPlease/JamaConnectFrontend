import React from "react";
import {useStoreState } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "./pages";
import { SelectItem } from "./components";
import SettingsPage from 'components/SettingsPage.js';
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
          <Route path ="/settingPage" component={SettingsPage} exact />
        </Switch>
      </Router>
    


  )
}
export default App;
