/* 
Functional React component to render the sync settings page by an administrator
*/

import React, {useRef} from 'react';
import SettingsForm from './SettingsForm.js';
import '../styles/pages/Settings.style.sass';
import '../styles/main/theme.sass';

/* 
TODOS:
- get route to where button will be that directs user to sync settings page
- get actual data 
*/

function SettingsPage(props) {
  // hard-coded for now 
  let prevSyncTime = 5; 
  let itemsToSync = 20;
  let timeUnit = " seconds";

  // use input_value.current property to access DOM element 
  const refInput = useRef(null);

  // get number of items currently ready to sync (for now just returning hard-coded data)
  function countItems() { return itemsToSync; }

  // get previous length of time it took to sync items (for now just returning hard-coded data)
  function getPrevSyncTime() { return [prevSyncTime, timeUnit]; }

  return (
    <div className="sync_settings_page_container">
        <SettingsForm 
          prevSyncTime={getPrevSyncTime()} 
          itemsToSync={countItems()} 
          refInput={refInput}
        /> 
    </div>
    
  );
}

export default SettingsPage;
