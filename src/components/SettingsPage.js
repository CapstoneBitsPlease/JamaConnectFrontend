import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import '../styles/components/Settings.style.sass';

/* Component to render sync settings page */
const SettingsPage = () => {
  const [prevSyncTime, setPrevSyncTime] = useState(0); 
  const [numFieldsToSync, setNumFieldsToSync] = useState(0);
  const [timeUnit, setTimeUnit] = useState("");
  const refInput = useRef(null);
  const [syncInterval, setSyncInterval] = useState("");
  const token = process.env.REACT_APP_TOKEN;
  const user = process.env.REACT_APP_USERNAME;
  const pass = process.env.REACT_APP_PASSWORD;
  const org = process.env.REACT_APP_ORG;
  
  // Post creds to retrieve jwt to make other calls 
  const login = () => {
    var url = 'http://127.0.0.1:5000/login/jama/basic?username=user&password=pass&organization=org';

    axios
      .post(url)
      .then(response => {
        console.log("success");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        // add it to the log on server
      });
  }

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
    var url = "http://127.0.0.1:5000/fields_ready_to_sync";

    axios
      .get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setNumFieldsToSync(response.data);
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
