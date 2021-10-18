import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import client from './component/client/client';
import inquirylist from './component/client/inquirylist';
import inquiryreg from './component/client/inquiryreg';

import admin from './component/admin/admin';
import signup from './component/admin/signup';
import admininquiry from './component/admin/adminInquirylist'
import adminInquiryanswer from './component/admin/adminInquiryanswer';
function App() {
  return (
    <Router>
      <Route exact path="/" component={client}></Route>
      <Route exact path="/inquiry/list" component={inquirylist}></Route>
      <Route exact path="/inquiry/reg" component={inquiryreg}></Route>

      <Route exact path="/admin" component={admin}></Route>
      <Route exact path="/admin/signup" component={signup}></Route>
      <Route exact path="/admin/inquiry" component={admininquiry}></Route>
      <Route exact path="/admin/inquiry/answer" component={adminInquiryanswer}></Route>
    </Router>
/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
