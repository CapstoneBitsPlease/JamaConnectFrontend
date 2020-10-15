import React, {useState, useRef, useEffect} from 'react';
import Button from '@atlaskit/button';
import '../styles/components/Settings.style.sass';
import axios from 'axios';

/* Component to render sync settings page */
const SettingsPage = (props) => {
  const [prevSyncTime, setPrevSyncTime] = useState(0); 
  const [numItemsToSync, setNumItemsToSync] = useState(0);
  const [timeUnit, setTimeUnit] = useState("");
  const refInput = useRef(null);
  const [syncInterval, setSyncInterval] = useState("");

  // makes request to backend, returns the data if successful, otherwise returns and logs an error
  const makeRequest = (api) => {
    var data = [];

    axios
      .post(api)
      .then(response => {
        console.log("success");
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
        // add it to the log on server
      });

      return data;
  }

  // makes request, returns number of items currently ready to sync
  const getNumItemsToSync = () => { 
    var count = 5; // change this
    var route = "/login/basic"; // and this
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const organization = process.env.ORGANIZATION;
    var api = `http://127.0.0.1:5000${route}?username=${username}&password=${password}&organization=${organization}`;

    // get data 
    makeRequest(api);

    // set state
    setNumItemsToSync(count);
  }

  // makes request, returns previous length of time it took to sync items
  const getPrevSyncTime = () => { 
    var currentTime = 30; // change this 
    var units = " seconds"; // and this 
    var route = "/login/basic";
    var host = "http://127.0.0.1:5000";
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const organization = process.env.ORGANIZATION;
    var api = `${host}${route}?username=${username}&password=${password}&organization=${organization}`;

    // get data
    makeRequest(api);

    // set state 
    setPrevSyncTime(currentTime);
    setTimeUnit(units);
  }

  // const updateSync = () => {}

  // on click of the button, prints updated sync interval to console and updates sync process 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(syncInterval);

    // updateSync(); 
}

// calls to backend made when component mounts
  useEffect(() => {
    getNumItemsToSync();
    getPrevSyncTime();
    // eslint-disable-next-line
}, [])


  // render the sync settings container and form component
  return (
    <div className="sync_settings_page_container">
      <form>
          <table className="sync_settings_page_table">
            <tbody>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Previous sync time:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{prevSyncTime} {timeUnit}</td>
            </tr>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Items to sync:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{numItemsToSync}</td>
            </tr>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Sync interval:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">
                <input 
                  ref={refInput}
                  type="text"
                  className="sync_interval_input" 
                  aria-label="sync_interval_input"
                  value={syncInterval}
                  onChange={e => setSyncInterval(e.target.value)}
                ></input>
                <div className="dropdown_container">
                  <select aria-label="units_menu" className="dropdown_list">
                    <option className="dropdown_list_item" aria-label="units_menu_item">seconds</option>
                    <option className="dropdown_list_item" aria-label="units_menu_item">minutes</option>
                    <option className="dropdown_list_item" aria-label="units_menu_item">hours</option>
                  </select>
                </div>  
              </td>
            </tr>
            </tbody>
          </table>
    
        <Button className="apply_button" type="submit" onClick={handleSubmit}>Apply</Button>
   
      </form>
  </div>
    
  );
}

export default SettingsPage;
