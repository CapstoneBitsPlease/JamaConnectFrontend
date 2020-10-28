import React from 'react';

/* Component to display sync settings table info */
const SyncSettingsTable = (props) => {

return (
    <table className="sync_settings_page_table">
        <tbody>
            <tr>
                <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Previous sync time:</th>
                <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{props.prevSyncTime} {props.timeUnit}</td>
            </tr>
            <tr>
                <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Fields to sync:</th>
                <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">{props.numFieldsToSync}</td>
            </tr>
            <tr>
                <th className="sync_settings_page_table_label" aria-label="sync_settings_page_table_label">Sync interval:</th>
                <td className="sync_settings_page_table_data" aria-label="sync_settings_page_table_data">
                    <input 
                        type="text"
                        className="sync_interval_input" 
                        aria-label="sync_interval_input"
                        value={props.syncInterval}
                        onChange={e => props.setSyncInterval(e.target.value)}
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
    )
}

export default SyncSettingsTable;