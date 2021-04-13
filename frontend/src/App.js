import React,{useEffect} from 'react';
import SignUp from './components/Home/SignUp';
import SignIn from './components/Home/SignIn';
import Posts from './components/Dashboard/Posts';
import Profile from './components/Dashboard/Profile';
import MyStories from './components/Dashboard/MyStories';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router className="app">
        <Route exact path="/" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/userprofile/:email" component={Posts} />
        <Route path={`/userprofile/:email/profile`} component={Profile} />
        <Route path={`/userprofile/:email/mystories`} component={MyStories} />
    </Router>
  );
}

export default App;
