import React from "react";
import Button from "@atlaskit/button";
import { useStoreActions} from "easy-peasy";
import "../styles/components/Navigation.style.sass";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

const Navigation = () => {
  const logout = useStoreActions((actions) => actions.accountStore.logout);
  const history = useHistory();
  const logoutUser = () =>{
    logout();
    history.push("/login")
    
  }
  return (
    <div>
      <nav>
        <ul className="navigation-container">
          <Button id="navigation" appearance="primary" type="button">
            <Link to="/selectItem">Select Item to link</Link>
          </Button>
          <Button id="navigation" appearance="primary" type="button">
            <Link to="/unlink">Unlink</Link>
          </Button>
          <Button id="navigation" appearance="primary" type="button">
            <Link to="/syncSettings">Sync Settings</Link>
          </Button>
          <Button id="navigation" appearance="primary" type="button">
            <Link to="/errorLog">Error Log</Link>
          </Button>
          <Button
            id="navigation"
            appearance="primary"
            type="button"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
