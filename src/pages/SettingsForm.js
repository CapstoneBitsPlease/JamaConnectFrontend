/* 
Functional React component to render the sync settings form  
*/

import React, {useState} from 'react';
import '../styles/pages/Settings.style.sass';
import '../styles/main/theme.sass';

function SettingsForm(props) {
    // initialize state
    const [syncInterval, setSyncInterval] = useState("");
    const [showSettings, setShowSettings] = useState(false);

    // set showSettings to false when user hits submit (and will eventually send data to correct destination)
    function handleSubmit(e) {
        e.preventDefault();
        setShowSettings(!props.showSettings)
    }

  // lots of HTML for the time being
  // adding more hooks and state once we get some to work with
    return (
    <div>
      <form>
          <table className="settings_page_table">
            <tbody>
            <tr>
              <th className="settings_page_table_label" aria-label="settings_page_table_label">Previous sync time:</th>
              <td className="settings_page_table_data" aria-label="settings_page_table_data">{props.prevSyncTime}</td>
            </tr>
            <tr>
              <th className="settings_page_table_label" aria-label="settings_page_table_label">Items to sync:</th>
              <td className="settings_page_table_data" aria-label="settings_page_table_data">{props.itemsToSync}</td>
            </tr>
            <tr>
              <th className="settings_page_table_label" aria-label="settings_page_table_label">Sync interval:</th>
              <td className="settings_page_table_data" aria-label="settings_page_table_data">
                <input 
                  type="text"
                  className="sync_interval_input" 
                  aria-label="sync_interval_input"
                  value={syncInterval}
                  onChange={e => setSyncInterval(e.target.value)}
                ></input>
                <div className="dropdown_container">
                  <select aria-label="units_menu" className="dropdown_list">
                    <option className="dropdown_list_item" aria-label="units_menu_item">seconds</option>
                    <option className="dropdown_list_item" aria-label="units_menu_item">minutes</option>
                    <option className="dropdown_list_item" aria-label="units_menu_item">hours</option>
                  </select>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div className="text-center">
            <button className="apply_button" type="submit" onClick={handleSubmit}>Apply</button>
          </div>
      </form>
  </div>
  )
}

export default SettingsForm;