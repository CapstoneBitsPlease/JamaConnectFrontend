import React from 'react';
import SyncSettings from 'components/SyncSettings/SyncSettingsAPI.js'
import SyncFields from 'components/SyncFields/SyncFieldsAPI.js';
import SyncFieldsOnCreateIssuePage from 'components/SyncFieldsOnCreateIssue/SyncFieldsOnCreateIssuePage.js'
import './App.css';
import './styles/main/App.sass';
import './styles/main/theme.sass';

function App() {
  // insert better conditional rendering of pages here soon 
    var toggle = 'SyncFields'

    return (
      <div className="App">
        {
          {
            'SyncSettings': <SyncSettings />,
            'SyncFields': <SyncFields />,
            'SyncFieldsOnCreateIssue': <SyncFieldsOnCreateIssuePage />
          }[toggle]
        }
      </div>
    );
  
}

export default App;
