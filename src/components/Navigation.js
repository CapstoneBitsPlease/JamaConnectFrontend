import React from "react";
import "../styles/components/Navigation.style.sass";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className="navigation-container">
          <li>
            <Link to="/selectItem">Select Item</Link>
          </li>
          <li>
            <Link to="/linkFields">Link Fields</Link>
          </li>
          <li>
            <Link to="/syncSettings">Sync Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;