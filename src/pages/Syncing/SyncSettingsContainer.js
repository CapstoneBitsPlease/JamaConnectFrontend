import React, {useEffect} from 'react';
import Button from '@atlaskit/button';
import SyncSettingsTable from './SyncSettingsTable.js'
import {useStoreActions, useStoreState} from "easy-peasy";
import makeToast from '../../components/Toaster';
import '../../styles/pages/SyncSettings.style.sass';

/* Component to render sync settings page */
const SyncSettingsContainer = () => {
  
  const { prevSyncTime, timeUnit, numFieldsToSync, syncInterval } = useStoreState(
      state => ({
          prevSyncTime: state.syncStore.prevSyncTime,
          timeUnit: state.syncStore.timeUnit,
          numFieldsToSync: state.syncStore.numFieldsToSync,
          syncInterval: state.syncStore.syncInterval
      })
  )

  const { getPrevSyncTime, getNumFieldsToSync, setSyncInterval } = useStoreActions(
      actions => ({
          getPrevSyncTime: actions.syncStore.getPrevSyncTime,
          getNumFieldsToSync: actions.syncStore.getNumFieldsToSync,
          setSyncInterval: actions.syncStore.setSyncInterval
      })
  )

  // calls to backend made when component mounts
  useEffect(() => { 
      getPrevSyncTime();
      getNumFieldsToSync();
      // eslint-disable-next-line
  }, [])
  
  // handles the "apply" button. prints updated sync interval, will update sync process 
  const handleApply = (e) => {
    e.preventDefault();
    if(syncInterval === "") {
      makeToast("error", "Input is required to update the sync process. Please enter a time interval.");
      return;
    }

    var selectedTimeUnit = document.getElementById("dropdown_list_selection").value
    console.log(syncInterval, selectedTimeUnit);

    // append user input to the DOM for testing purposes
    var testDiv = document.createElement("div");
    testDiv.id = "test_div";
    testDiv.innerHTML = `<p>${syncInterval} ${selectedTimeUnit}<p>`
    document.body.appendChild(testDiv);

    // POST sync interval
  }

  return (
    <div className="sync_settings_page_container">
      <form>
          <h1 className="sync_settings_page_title">Sync settings</h1>
          <SyncSettingsTable 
            prevSyncTime={prevSyncTime}
            timeUnit={timeUnit}
            numFieldsToSync={numFieldsToSync}
            syncInterval={syncInterval}
            setSyncInterval={setSyncInterval}
          />
        <Button id="apply_button" className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
      </form>
  </div>
    
  );
}

export default SyncSettingsContainer;
