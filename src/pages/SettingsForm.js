/* 
  Functional React component to render the sync settings form  
*/

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/pages/Settings.style.sass';
import '../styles/main/theme.sass';


function SettingsForm(props) {
    // initialize state
    const [syncInterval, setSyncInterval] = useState("");

    // prints out sync interval for now (will eventually send it somewhere where it can be more helpful)
    function handleSubmit(e) {
        e.preventDefault();
        console.log(syncInterval)
    }

    // api calls will be made in useEffect hooks (testing with projects for now)
    useEffect(() => {
        const url = "https://www.capstone2020.jamacloud/rest/v1/projects";
        const key = "";
        console.log("starting api call");
        axios.get((url), {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic`
          }
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error))
          console.log("ending api call");
    }, [])

    return (
    <div>
      <form>
          <table className="sync_settings_page_table">
            <tbody>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Previous sync time:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{props.prevSyncTime}</td>
            </tr>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Items to sync:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{props.itemsToSync}</td>
            </tr>
            <tr>
              <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Sync interval:</th>
              <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">
                <input 
                  ref={props.refInput}
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
    
        <button className="apply_button" type="submit" onClick={handleSubmit}>Apply</button>
   
      </form>
  </div>
  )
}

export default SettingsForm;