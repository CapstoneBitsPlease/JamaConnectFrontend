/* 
Functional React component to render the sync settings form  
*/

import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../SettingsPage.css';
import '../styles/main/theme.sass';

function SettingsForm(props) {
    // initial state
    const [syncInterval, setSyncInterval] = useState("");
    const [setShowSettings] = useState(false);
   
    // save the new value of syncInterval
    const handleChange = (e) => {
        setSyncInterval(e.target.value)
    }

    // close the settings page 
    const handleClosePage = () => setShowSettings(false);

  // lots of HTML for the time being
  // adding more hooks and state once we get some to work with
    return (
    <div>
      <form>
          <table className="settings_table">
            <tbody>
            <tr>
              <th className="settings_label" aria-label="settings_label">Previous <br/>sync time:</th>
              <td className="settings_data" aria-label="settings_data">{props.prevSyncTime}</td>
            </tr>
            <tr>
              <th className="settings_label" aria-label="settings_label">Items to sync:</th>
              <td className="settings_data" aria-label="settings_data">{props.itemsToSync}</td>
            </tr>
            <tr>
              <th className="settings_label" aria-label="settings_label">Sync interval:</th>
              <td className="settings_data" aria-label="settings_data">
                <input 
                  className="sync_interval_input" 
                  aria-label="sync_interval_input"
                  value={syncInterval}
                  onChange={handleChange}
                ></input>
                <div className="dropdown_container">
                  <select aria-label="dropdown_menu" className="units_list">
                    <option className="units_list_item" aria-label="units_list_item">seconds</option>
                    <option className="units_list_item" aria-label="units_list_item">minutes</option>
                    <option className="units_list_item" aria-label="units_list_item">hours</option>
                  </select>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div className="text-center">
            <Button variant="primary" className="apply_button" type="submit" onSubmit={handleClosePage}>Apply</Button>
          </div>
      </form>
  </div>
    )
}

export default SettingsForm;