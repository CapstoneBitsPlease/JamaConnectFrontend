import React from 'react';
import TextField from '@atlaskit/textfield';

/* Component to display sync settings table info */
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
                <th className="sync_settings_page_table_label">Sync interval:</th>
                <td className="sync_settings_page_table_data">
                    <span className="select_input">
                        <TextField 
                            name="basic"
                            className="sync_interval_input"
                            value={props.syncInterval}
                            onChange={e => props.setSyncInterval(e.target.value)}
                        ></TextField>
                        <div className="dropdown_container">
                            <select className="dropdown_list">
                            <option className="dropdown_list_item" value={props.timeUnit} >seconds</option>
                            <option className="dropdown_list_item" value={props.timeUnit}>minutes</option>
                            <option className="dropdown_list_item" value={props.timeUnit}>hours</option>
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