import React,{ Component } from "react";
import '../css/Navbarlogin.css'


class Navbarlogin extends Component{

    render()
    {
        return (

            <nav  id="LoginNav" className="navbar navbar-expand-lg navbar-light bg-dark fixed-top" style={{opacity: 1}}>
                <a className="navbar-brand mb-0 h1" href="/">
                <img src={require('../images/300px-HomeAway_Logo.svg.png')} style={{height: '100%'}} alt="Logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="navbar-brand" href="/">
                                <img src ={require('../images/homeaway-3.svg')}  style={{width:50,height:100}} alt="Logo2"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>


        )
    };
}

export default Navbarlogin;