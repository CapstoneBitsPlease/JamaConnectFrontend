import React from "react";
import { useStoreState } from "easy-peasy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "./pages";
import { SelectItem } from "./components";
import { SyncSettings, SyncFields, SyncFieldsOnCreateIssue } from './components/Syncing'
//import SettingsPage from 'components/SettingsPage.js';
//import SyncFields from 'components/Syncing/SyncFieldsAPI.js';
//import SyncFieldsOnCreateIssue from 'components/Syncing/SyncFieldsOnCreateIssueContainer.js';

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
          <Route path ="/settingsPage" component={SyncSettings} exact />
          <Route path ="/syncFields" component={SyncFields} exact />
          <Route path ="/syncFieldsOnCreateIssue" component={SyncFieldsOnCreateIssue} exact />
        </Switch>
      </Router>
  )
}
export default App;
