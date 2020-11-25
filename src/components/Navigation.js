import React from "react";
import Button from "@atlaskit/button";
import "../styles/components/Navigation.style.sass";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Navigation = () => {
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
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
