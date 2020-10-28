import React from 'react';
import SettingsPage from 'components/SettingsPage.js';
import './App.css';
import './styles/main/App.sass';
import './styles/main/theme.sass';

function App() {
  // insert conditional rendering of pages here

  return (
    <div className="App">
      <SettingsPage />
    </div>

  );
}

export default App;
