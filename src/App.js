import React from 'react';
import SyncSettingsPage from 'components/SyncSettingsPage.js';
import SyncFieldsPage from 'components/SyncFieldsPage.js';
import './App.css';
import './styles/main/App.sass';
import './styles/main/theme.sass';

function App() {
  // insert better conditional rendering of pages here soon 
    var toggle = 'SyncFieldsPage'

    return (
      <div className="App">
        {
          {
            'SyncFieldsPage': <SyncFieldsPage />,
            'SyncSettingsPage': <SyncSettingsPage />
          }[toggle]
        }
      </div>
    );
  
}

export default App;
