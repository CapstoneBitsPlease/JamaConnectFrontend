import React, {useEffect} from 'react';
import Button from '@atlaskit/button';
import SyncSettingsTable from './SyncSettingsTable.js'
import {useStoreActions, useStoreState} from "easy-peasy";
import axios from "axios";
import makeToast from '../../components/Toaster';
import '../../styles/pages/SyncSettings.style.sass';

// Container for sync settings page elements 
const SyncSettingsContainer = () => {
  const devURL = "http://127.0.0.1:5000";
  
  const { prevSyncTime, timeUnit, numFieldsToSync, syncInterval, token } = useStoreState(
      state => ({
          prevSyncTime: state.syncStore.prevSyncTime,
          timeUnit: state.syncStore.timeUnit,
          numFieldsToSync: state.syncStore.numFieldsToSync,
          syncInterval: state.syncStore.syncInterval,
          token: state.accountStore.token
      })
  )

  const { getPrevSyncTime, getNumFieldsToSync, setSyncInterval } = useStoreActions(
      actions => ({
          getPrevSyncTime: actions.syncStore.getPrevSyncTime,
          getNumFieldsToSync: actions.syncStore.getNumFieldsToSync,
          setSyncInterval: actions.syncStore.setSyncInterval
      })
  )

  // API call to update the sync interval
  const postSyncInterval = (syncInterval) => {
    axios({
        url: `${devURL}/sync/set_interval?interval=${syncInterval}`,
        method: "post",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response);
        makeToast("success", "Sync interval set successfully.");
      })
      .catch(error => {
        console.log("error:", error);
        makeToast("error", "Error when updating sync interval. Please see the error logs."); 
      })
    }

  // calls to backend made when component mounts
  useEffect(() => { 
      getPrevSyncTime();
      getNumFieldsToSync();
      // eslint-disable-next-line
  }, [])
  
  // handles the "apply" button. prints updated sync interval, will update sync process 
  const handleApply = () => {
    if(syncInterval === "") {
      makeToast("error", "Input is required to update the sync process. Please enter a time interval.");
    }

    else {
      var selectedTimeUnit = document.getElementById("dropdown_list_selection").value;
      console.log(syncInterval, selectedTimeUnit);

      // POST sync interval in seconds
      var intervalInSeconds = syncInterval;
      if(selectedTimeUnit === "minutes") 
        intervalInSeconds *= 60;
      else if(selectedTimeUnit === "hours")
        intervalInSeconds *= 3600;
      postSyncInterval(intervalInSeconds);

      // clear input
      document.getElementById("select_input_text_field").value = "";
    }
  }  

  return (
    <div className="sync_settings_page_container">
      <h1 className="sync_settings_page_title">Sync settings</h1>
      <SyncSettingsTable 
        prevSyncTime={prevSyncTime}
        timeUnit={timeUnit}
        numFieldsToSync={numFieldsToSync}
        syncInterval={syncInterval}
        setSyncInterval={setSyncInterval}
      />
      <Button id="apply_button" appearance="primary" className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
  </div>
    
  );
}

export default SyncSettingsContainer;
