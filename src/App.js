import React from 'react';
import SyncSettings from 'components/Syncing/SyncSettingsAPI.js'
import SyncFields from 'components/Syncing/SyncFieldsAPI.js';
import SyncFieldsOnCreateIssue from 'components/Syncing/SyncFieldsOnCreateIssuePage.js'
import SelectItemByID from 'components/select_item.js'
import './App.css';
import './styles/main/App.sass';
import './styles/main/theme.sass';

function App() {
  // insert better conditional rendering of pages here soon 
    var toggle = 'SyncSettings'

    return (
      <div className="App">
        {
          {
            'SyncSettings': <SyncSettings />,
            'SyncFields': <SyncFields />,
            'SyncFieldsOnCreateIssue': <SyncFieldsOnCreateIssue />,
            'SelectItemByID': <SelectItemByID />
          }[toggle]
        }
      </div>
    );
  
}

export default App;
