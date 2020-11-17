import React from 'react';

// Displays sync settings table info 
const SyncSettingsTable = (props) => {

return (
    <table className="sync_settings_page_table">
        <tbody>
            <tr>
                <th className="sync_settings_page_table_label">Previous sync time:</th>
                <td className="sync_settings_page_table_data">{props.prevSyncTime} {props.timeUnit}</td>
            </tr>
            <tr>
                <th className="sync_settings_page_table_label">Fields to sync:</th>
                <td className="sync_settings_page_table_data">{props.numFieldsToSync}</td>
            </tr>
            <tr>
                <th className="sync_settings_page_table_label">Set new sync interval:</th>
                <td className="sync_settings_page_table_data">
                    <span className="select_input">
                        <input 
                            type="text"
                            id="select_input_text_field"
                            autoComplete="off"
                            className="sync_interval_input"
                            value={props.syncInterval}
                            onChange={e => props.setSyncInterval(e.target.value)}
                        ></input>
                        <div className="dropdown_container">
                            <select id="dropdown_list_selection" className="dropdown_list">
                                <option id="dropdown_list_seconds" className="dropdown_list_item">seconds</option>
                                <option id="dropdown_list_minutes" className="dropdown_list_item">minutes</option>
                                <option id="dropdown_list_hours" className="dropdown_list_item">hours</option>
                            </select>
                        </div>  
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
    )
}

export default SyncSettingsTable;