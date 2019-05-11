import React, { Component } from 'react';
import '../css/Navbarhome.css';
import cookie from "react-cookies";
import Link from "react-router-dom/es/Link";

class Navbarhome extends Component {

    constructor(props)
    {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout = (e) =>
    {
        cookie.remove('cookie', { path: '/' });
        cookie.remove('userid', { path: '/' });
    }

    render() {
        return (
            <nav className="navbar-home navbar-expand-lg navbar-light bg-light fixed-top" style={{opacity: 1}}>
                <a className="navbar-brand mb-0 h1" href="/">
                    <img src={require('../images/300px-HomeAway_Logo.svg.png')} style={{height: '100%'}} alt="Logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        { (cookie.load('cookie') == 'owner') &&
                        (<li className="nav-item btn-link">
                            <a className="nav-link"><Link to="/OwnerDashboard"> Dashboard <span className="sr-only">current</span></Link></a>
                        </li>)}
                        { (cookie.load('cookie') == 'traveller') &&
                        (<li className="nav-item btn-link">
                            <a className="nav-link"><Link to="/Dashboard"> Dashboard <span className="sr-only">current</span></Link></a>
                        </li>)}
                        {(cookie.load('cookie')) &&
                        (<li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {cookie.load('username')}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" ><Link to="/">Home</Link></a>
                                <a className="dropdown-item" ><Link to="/" onClick={this.logout}>Logout</Link></a>
                            </div>
                        </li>)
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Help
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Help1</a>
                                <a className="dropdown-item" href="#">Help2</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        { (cookie.load('cookie') == 'owner') &&
                        (<li className="nav-item">
                            <button className="btn btn-outline my-2 my-sm-0" type="submit"><Link to="/Listproperty"> List Your Property </Link></button>
                        </li>)}
                        <li className="nav-item">
                            <a className="navbar-brand" href="#">
                                <img src={require('../images/homeaway-3.svg')} style={{width: 50, height: 30}}
                                     alt="Logo2"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default Navbarhome;