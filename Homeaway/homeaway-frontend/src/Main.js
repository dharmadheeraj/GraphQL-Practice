import React,{ Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.js';
import UserLogin from './components/UserLogin.js';
import OwnerLogin from './components/OwnerLogin.js';
import Dashboard from "./components/Dashboard";
import PropertyPage from "./components/PropertyPage";
import OwnerDashboard from "./components/OwnerDashboard";
import ListProperty from "./components/ListProperty";


class Main extends Component{

    render()
    {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/Userlogin" component={UserLogin}/>
                <Route exact path="/Ownerlogin" component={OwnerLogin}/>
                <Route exact path="/Dashboard/:page/:id" component={Dashboard}/>
                <Route exact path="/OwnerDashboard/:page/:id" component={OwnerDashboard}/>
                <Route exact path="/OwnerDashboard" component={OwnerDashboard}/>
                <Route path="/Listproperty" component={ListProperty}/>
                <Route exact path="/property/:id/:from/:to"  component={PropertyPage}/>
            </div>
        );
        }
};

export default Main;
