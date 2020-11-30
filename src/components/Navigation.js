import React from "react";
import Button from "@atlaskit/button";
import "../styles/components/Navigation.style.sass";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import {useStoreActions} from "easy-peasy";

const Navigation = () => {
  const history = useHistory();
  const setLoggedIn = useStoreActions(actions => actions.accountStore.setLoggedIn);
  const setToken = useStoreActions(actions => actions.accountStore.setToken);

  // handles the "sign out" button. asks user to confirm, erases token and moves back to login page if they do
  const handleSignOut = () => {
    var answer = window.confirm("Are you sure you want to sign out?")
    if(answer) {
      setLoggedIn(false);
      setToken(null);
      history.push("/login");
    }
  }

  return (
    <div>
      <nav>
        <ul className="navigation-container">
          <Button id="navigation" appearance="subtle" type="button">
            <Link to="/selectItem">Select item to link</Link>
          </Button>
          <Button id="navigation" appearance="subtle" type="button">
            <Link to="/unlink">Unlink</Link>
          </Button>
          <Button id="navigation" appearance="subtle" type="button">
            <Link to="/syncSettings">Sync settings</Link>
          </Button>
          <Button id="navigation" appearance="subtle" type="button">
            <Link to="/errorLog">Error log</Link>
          </Button>
          <Button id="navigation" appearance="primary" type="button" onClick={handleSignOut}>
            Sign out
          </Button>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
