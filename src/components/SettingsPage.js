/* 
Functional React component to render the sync settings page by an admin
*/


import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import SettingsForm from './SettingsForm.js'
import '../SettingsPage.css';
import '../styles/main/theme.sass';

/* 
TODOS:
- get route to where button will be that directs admin to settings page
- get actual data 
- check user permissions
*/

function SettingsPage(props) {
  // hard-coded for now 
  let prevSyncTime = 5; 
  let itemsToSync = 20;
  let timeUnit = " seconds";

  // set initial state with useState hook
  const [showSettings, setShowSettings] = useState(false);

  /* Event handlers for buttons */
  // show the settings page
  const handleShowSettings = () => setShowSettings(true);

  // close the settings page 
  const handleClosePage = () => setShowSettings(false);

  // get number of items currently ready to sync (for now just returning hard-coded answers)
  function countItems() { return itemsToSync; }

  // get previous length of time it took to sync items (for now just returning hard-coded answers)
  function getPrevSyncTime() { return [prevSyncTime, timeUnit]; }

  return (
    <div className="App" role="main">

      <Button variant="dark" onClick={handleShowSettings}>Sync Settings</Button>
      <Modal
        show={showSettings}
        onHide={handleClosePage}
        dialogClassName="modal-100w"
        animation={false}
        backdrop="static"
      > 
        <ModalHeader closeButton>
          <Modal.Title className="page_name">Sync Settings</Modal.Title>
        </ModalHeader>
        <SettingsForm 
          prevSyncTime={prevSyncTime} 
          itemsToSync={itemsToSync} 
         />
      </Modal>
      
    </div>
    
  );
}

export default SettingsPage;
