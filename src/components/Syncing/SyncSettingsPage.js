import React from 'react';
import Button from '@atlaskit/button';
import SyncSettingsTable from './SyncSettingsTable.js'
import '../../styles/components/SyncSettings.style.sass';

/* Component to render sync settings page */
const SettingsPage = (props) => {
  
  // on click of the button, prints updated sync interval, will update sync process 
  const handleApply = (e) => {
    e.preventDefault();
    var selected_time_unit = document.getElementById("dropdown_list_selection").value
    console.log(props.syncInterval, selected_time_unit);
    // update backend sync process to occur this often
  }

  return (
    <div className="sync_settings_page_container">
      <form>
          <h1 className="sync_settings_page_title">Sync settings</h1>
          <SyncSettingsTable 
            prevSyncTime={props.prevSyncTime}
            timeUnit={props.timeUnit}
            numFieldsToSync={props.numFieldsToSync}
            syncInterval={props.syncInterval}
            setSyncInterval={props.setSyncInterval}
          />
        <Button id="apply_button" className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
      </form>
  </div>
    
  );
}

export default SettingsPage;
