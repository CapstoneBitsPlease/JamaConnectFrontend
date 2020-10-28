import React from 'react';
import Button from '@atlaskit/button';
import SyncSettingsTable from 'components/Syncing/SyncSettingsTable.js'
import '../../styles/components/SyncSettings.style.sass';

/* Component to render sync settings page */
const SettingsPage = (props) => {
  
  // on click of the button, prints updated sync interval to console and updates sync process 
  const handleApply = (e) => {
    e.preventDefault();
    console.log(props.syncInterval);
    // make request to update sync process 
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
        <Button className="apply_button" type="submit" onClick={handleApply}>Apply</Button>
      </form>
  </div>
    
  );
}

export default SettingsPage;
