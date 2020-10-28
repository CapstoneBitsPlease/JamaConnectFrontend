import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import SyncSettingsTable from 'components/SyncSettingsTable.js'
import '../styles/components/SyncSettings.style.sass';

/* Component to render sync settings page */
const SettingsPage = () => {
  const [prevSyncTime, setPrevSyncTime] = useState(0); 
  const [numFieldsToSync, setNumFieldsToSync] = useState(0);
  const [timeUnit, setTimeUnit] = useState("");
  const [syncInterval, setSyncInterval] = useState("");

  // makes request to backend and changes prevSync data if successful, otherwise returns and logs an error
  const getPrevSyncTime = () => {
    var url = "http://127.0.0.1:5000/last_sync_time";
    
    axios
      .get(url)
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
      .get(url)
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
  const handleApply = (e) => {
    e.preventDefault();
    console.log(syncInterval);
    // make request to update sync process 
  }

  // calls to backend made when component mounts
  useEffect(() => { 
    getPrevSyncTime();
    getFieldsToSync();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="sync_settings_page_container">
      <form>
          <SyncSettingsTable 
            prevSyncTime={prevSyncTime}
            timeUnit={timeUnit}
            numFieldsToSync={numFieldsToSync}
            syncInterval={syncInterval}
            setSyncInterval={setSyncInterval}
          />
        <Button className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
      </form>
  </div>
    
  );
}

export default SettingsPage;
