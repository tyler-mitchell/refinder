import React from 'react'
import { NavLink, BrowserRouter, Switch, Route } from "react-router-dom";
import Products from './features/ecommerce/Products';
import Login from "./Login/Login";
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

    return(
        <BrowserRouter>
           <Switch> 
               <Route path="/login" exact component={Login} />
               <Router path="/dashboard" component={Products}/>
            </Switch>
           
        </BrowserRouter>
    )
}
export default Router;
