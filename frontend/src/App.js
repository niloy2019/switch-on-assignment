import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup';
import Home from './components/Home';
import Pending from './components/Pending';
import Approved from './components/Approved';
import Rejected from './components/Rejected';
import Departmental from './components/Departmental';
import Navbar from './components/Navbar';
import {Link} from 'react-router-dom'
import submitted from './components/Submitted';
import ApprovalRequests from './components/ApprovalRequests';
import notification from './components/notification';

function App() {
  return (
    <Router  >
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/approvalrequests" component={ApprovalRequests} />
        <Route path="/approved" component={Approved} />
        <Route path="/rejected" component={Rejected} />
        <Route path="/departmentalrequests" component={Departmental} />
        <Route path="/submit" component={submitted} />
        <Route path="/pending" component={Pending} />
        <Route path="/notification" component={notification} />
      </Switch>
  </Router>
  );
}

export default App;
