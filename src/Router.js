import React from 'react'
import { NavLink, BrowserRouter, Switch, Route } from "react-router-dom";
import Products from './features/ecommerce/Products';
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Dashboard from './Dashboard';
import Landing from './Landing';

/*
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetails}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/create' component={CreateProject}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


*/
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>

    </BrowserRouter>
  )
}
export default Router;
