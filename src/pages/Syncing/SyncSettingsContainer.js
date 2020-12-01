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

  // state and actions from sync and account store
  const { prevSyncTime, timeUnit, numFieldsToSync, syncInterval, selectedTimeUnit, token } = useStoreState(
      state => ({
          prevSyncTime: state.syncStore.prevSyncTime,
          timeUnit: state.syncStore.timeUnit,
          numFieldsToSync: state.syncStore.numFieldsToSync,
          syncInterval: state.syncStore.syncInterval,
          selectedTimeUnit: state.syncStore.selectedTimeUnit,
          token: state.accountStore.token
      })
  )
  const { getPrevSyncTime, getNumFieldsToSync, setSyncInterval, setSelectedTimeUnit } = useStoreActions(
      actions => ({
          getPrevSyncTime: actions.syncStore.getPrevSyncTime,
          getNumFieldsToSync: actions.syncStore.getNumFieldsToSync,
          setSyncInterval: actions.syncStore.setSyncInterval,
          setSelectedTimeUnit: actions.syncStore.setSelectedTimeUnit
      })
  )

  // API call - updates the sync interval
  const postSyncInterval = async(syncInterval) => {
    return await axios({
        url: `${devURL}/sync/set_interval?interval=${syncInterval}`,
        method: "post",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log("error:", error);
      })
    }

  // request info once component mounts
  useEffect(() => { 
      getPrevSyncTime();
      getNumFieldsToSync();
      // eslint-disable-next-line
  }, [])
  
  // handles the "apply" button. updates sync interval
  const handleApply = () => {
    if(syncInterval === "") {
      makeToast("error", "Input is required to update the sync process. Please enter a time interval.");
    }

    else {
      // set time unit and interval with user input 
      var chosenTimeUnit = document.getElementById("dropdown_list_selection").value;
      var interval = document.getElementById("select_input_text_field").value;
      setSelectedTimeUnit(chosenTimeUnit);
      setSyncInterval(interval);

      // convert sync interval to seconds
      var intervalInSeconds = interval;
      if(chosenTimeUnit === "minutes") 
        intervalInSeconds *= 60;
      else if(chosenTimeUnit === "hours")
        intervalInSeconds *= 3600;

      // try to POST sync interval
      var promise = postSyncInterval(intervalInSeconds);

      // resolve and evaluate promise 
      promise.then(response => {
        // successful
        if(response.status === 200) {
          makeToast("success", "Sync interval set successfully.");
          // clear input
          document.getElementById("select_input_text_field").value = "";
        }
        // unsuccessful
        else {
          makeToast("error", "Error when updating sync interval. Please see the error logs."); 
        }
      }) 
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
        selectedTimeUnit={selectedTimeUnit}
        setSyncInterval={setSyncInterval}
      />
      <Button id="apply_button" appearance="primary" className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
    </div>  
  );
}

export default SyncSettingsContainer;
