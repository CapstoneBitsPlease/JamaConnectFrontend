import React from 'react';
import { Login } from "./pages";
import './App.css';
import './styles/main/theme.sass';
import Select_item  from './Page/select_item';

function App() {
  return (
    <div>
      <Select_item></Select_item>
        <Login/>

    </div>
  );
}

export default App;
