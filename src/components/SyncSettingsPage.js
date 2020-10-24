import React, {useState, useRef, useEffect} from 'react';
import {login} from '../utils.js'; // necessary to get token for calls
import axios from 'axios';
import Button from '@atlaskit/button';
import '../styles/components/SyncSettings.style.sass';

/* Component to render sync settings page */
const SettingsPage = () => {
  const [prevSyncTime, setPrevSyncTime] = useState(0); 
  const [numFieldsToSync, setNumFieldsToSync] = useState(0);
  const [timeUnit, setTimeUnit] = useState("");
  const refInput = useRef(null);
  const [syncInterval, setSyncInterval] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // only kept here during development
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDM1Njk3NjksIm5iZiI6MTYwMzU2OTc2OSwianRpIjoiMDNjMmM5OTctNTViZS00MTBjLWFkZTItZjE3YjU4YWE0MDcxIiwiZXhwIjoxNjAzNTcwNjY5LCJpZGVudGl0eSI6eyJjb25uZWN0aW9uX2lkIjoiYTI2YmJmNTktZGIxMi00YjAyLTk5MDUtOTliNzJjYTJhNTVkIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.pw77K-uTaXaFlkPbH7IbKeVmPzK4gB45gsbv-G06UsE";

  // makes request to backend and changes prevSync data if successful, otherwise returns and logs an error
  const getPrevSyncTime = () => {
    var url = "http://127.0.0.1:5000/last_sync_time";
    
    axios
      .get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setPrevSyncTime(response.data[0]);
        setTimeUnit(response.data[1]);
      })
      .catch(error => {
        console.log(error);
        // add it to the log on server
      });
  }

  // makes request to backend and changes numFieldsToSync data if successful, otherwise returns and logs an error
  const getFieldsToSync = () => {
    var url = "http://127.0.0.1:5000/fields_to_sync";

    axios
      .get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setNumFieldsToSync(response.data["num_fields"]);
      })
      .catch(error => {
        console.log(error);
        // add it to the log on server
      });

  }

  // on click of the button, prints updated sync interval to console and updates sync process 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(syncInterval);

    // make request to update sync process 
}

// calls to backend made when component mounts
  useEffect(() => {
    login(); // won't be necessary once our components are connected
    getPrevSyncTime();
    getFieldsToSync();
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
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Fields to sync:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{numFieldsToSync}</td>
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
