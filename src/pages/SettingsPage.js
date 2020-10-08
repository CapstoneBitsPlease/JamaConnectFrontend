/* 
Functional React component to render the sync settings page by an administrator
*/

/* 
Route: https://capstone2020.jamacloud.com/perspective.req#/ 
id of "settings" element: ext-gen2804
*/

import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import SettingsForm from './SettingsForm.js'
import '../styles/pages/Settings.style.sass';
import '../styles/main/theme.sass';

/* 
TODOS:
- get rid of modal components
- get route to where button will be that directs user to sync settings page
- get actual data 
- check user permissions?
*/

function SettingsPage(props) {
  // hard-coded for now 
  let prevSyncTime = 5; 
  let itemsToSync = 20;
  let timeUnit = " seconds";

  // set initial state with useState hook
  const [showSettings, setShowSettings] = useState(false);

  // get number of items currently ready to sync (for now just returning hard-coded answers)
  function countItems() { return itemsToSync; }

  // get previous length of time it took to sync items (for now just returning hard-coded answers)
  function getPrevSyncTime() { return [prevSyncTime, timeUnit]; }

  // shows settings page 
  function showPage(showSettings) {
    let style = {}

    if(showSettings) {
      style = {"display": "block"}
    }
    else style = {"display": "hidden"}
    
    return style
      
  }


  //() => setShowSettings(true)
  return (
    <div className="settings_page_container" role="main">
      <button className="apply_button" onClick={() => setShowSettings(true)}>Sync Settings</button>
      <div className="settings_form_container" style={showPage(showSettings)}>
      <Modal
        show={showSettings}
        onHide={() => setShowSettings(false)}
        size="lg"
        animation={false}
        backdrop="static"
      >
        <ModalHeader closeButton>
          <Modal.Title className="page_name">Sync Settings</Modal.Title>
        </ModalHeader>

        <SettingsForm 
          showSettings={showSettings}
          prevSyncTime={getPrevSyncTime()} 
          itemsToSync={countItems()} 
        />
      </Modal>
      </div>
    </div>
    
  );
}

export default SettingsPage;
