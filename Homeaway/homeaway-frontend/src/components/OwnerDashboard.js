import React,{ Component } from 'react';
import Navbarhome from "./Navbarhome";
import '../css/OwnerDashboard.css';
import OwnerProperties from "./OwnerProperties";
import OwnerBookings from "./OwnerBookings";
import Profile from "./Profile";
import Account from "./Account";
import cookies from "react-cookies";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";

class OwnerDashboard extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            userid : cookies.load('userid')
        }
    }

    render()
    {
        if(!(cookies.load('cookie') === 'owner'))
        {
            return(
                <Redirect to='/Ownerlogin'/>
            )
        }
        else {
            return (
                <div>
                    <Navbarhome/>
                    <div className="container-dashboard">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "properties") && ("active"))  }><Link to={"/OwnerDashboard/properties/" + this.state.userid}>Properties</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "bookings") && ("active"))  }><Link to={"/OwnerDashboard/bookings/" + this.state.userid}>Bookings</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "profile") && ("active"))  }><Link to={"/OwnerDashboard/profile/" + this.state.userid}>Profile</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "account") && ("active"))  }><Link to={"/OwnerDashboard/account/" + this.state.userid}>Account</Link></a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            { (this.props.match.params.page === "properties") && (<div className="tab-pane fade show active" id="nav-Inbox" role="tabpanel"
                                                                                       aria-labelledby="nav-Inbox-tab"><OwnerProperties userid={this.state.userid} />
                            </div>) }
                            { (this.props.match.params.page === "bookings") && (<div className="tab-pane fade show active" id="nav-trips" role="tabpanel"
                                                                                     aria-labelledby="nav-trips-tab"><OwnerBookings userid={this.state.userid} />
                            </div>)}
                            { (this.props.match.params.page === "profile") && (<div className="tab-pane fade show active" id="nav-profile" role="tabpanel"
                                                                                    aria-labelledby="nav-profile-tab"><Profile userid={this.state.userid}/>
                            </div>)}
                            { (this.props.match.params.page === "account") && (<div className="tab-pane fade show active" id="nav-Account"role="tabpanel"
                                                                                    aria-labelledby="nav-profile-tab"><Account userid={this.state.userid}/>
                            </div>)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default OwnerDashboard;