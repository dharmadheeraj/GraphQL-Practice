import React, { Component } from 'react';
import Navbarlogin from "./Navbarlogin";
import '../css/Ownerlogin.css';
import Redirect from "react-router-dom/es/Redirect";
import OwnerForm from "./OwnerForm";
import cookies from "react-cookies";

class OwnerLogin extends Component{


    constructor(props){
        super(props);

        this.state = {
            auth : ''
    }
    }


    render(){

        var content = null;

        if(!this.state.auth)
        {
            content = (
                <div>
                    <Navbarlogin />
                    <OwnerForm auth={ auth => this.setState({auth})}/>
                </div>
            )}else
        {

            content = (
                <Redirect to= "/OwnerDashboard"/>

            )
        }

        if((cookies.load('cookie') === 'owner'))
        {
            return(
                <Redirect to='/OwnerDashboard'/>
            )
        }
        else {
            return (
                <div id="OwnerLogin" className="jumbotron jumbotron-fluid">
                    {content}
                </div>
            );
        }
    }
}

export default OwnerLogin;