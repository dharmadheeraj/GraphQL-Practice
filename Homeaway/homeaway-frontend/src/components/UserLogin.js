import React, { Component } from 'react';
import Navbarlogin from "./Navbarlogin";
import UserForm from "./UserForm";
import '../css/Userlogin.css';
import Redirect from "react-router-dom/es/Redirect";
import cookies from "react-cookies";


class UserLogin extends Component {


    constructor(props){
        super(props);

        this.state = {
            auth : ''
        }
    }


    render()
    {
        var content = null;

        if(!this.state.auth)
        {
            content = (
                <div>
                    <Navbarlogin/>
                    <UserForm auth={ auth => this.setState({auth})}/>
                </div>
            )
        }
        else
        {
            content = (
                <Redirect to= "/"/>
            )
        }


        if((cookies.load('cookie') === 'traveller'))
        {
            return(
                <Redirect to={'/Dashboard/profile/' + cookies.load("userid")}/>
            )
        }
        else {
            return (


                <div id="Userlogin" className="jumbotron jumbotron-fluid">

                    {content}
                </div>
            )
        }

    }
}

export default UserLogin;

