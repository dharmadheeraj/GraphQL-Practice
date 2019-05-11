import React,{Component} from "react";
import '../css/ListProperty.css';
import Navbarhome from "./Navbarhome";
import Location from "./Location";
import Description from "./Description";
import BookingOptions from "./BookingOptions";
import AddPhotos from "./AddPhotos";
import Pricing from "./Pricing";
import axios from "axios";
import cookies from "react-cookies";
import Redirect from "react-router-dom/es/Redirect";

class ListProperty extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            location : '',
            propname : '',
            propdesc : '',
            proptype : '',
            bed : '',
            bath : '',
            capacity : '',
            bookingoptions : '',
            from : '',
            to : '',
            price : '',
            minstay :'',
            files : [],
            uploaded : false
        }

        this.submit = this.submit.bind(this);
    }

    submit = (e) => {

        const propdata = {
            userid : cookies.load('userid'),
            location : this.state.location,
            propname : this.state.propname,
            propdesc : this.state.propdesc,
            proptype : this.state.proptype,
            bed : this.state.bed,
            bath : this.state.bath,
            capacity : this.state.capacity,
            bookingoptions : this.state.bookingoptions,
            from : this.state.from,
            to : this.state.to,
            price : this.state.price,
            minstay : this.state.minstay,
        }

        const  data  = Object.assign({},this.state);

        //const { files } = this.state;
        let formData = new FormData();

        console.log(data.files[0]);



        formData.append('propname', this.state.propname);
        formData.append('propdata', JSON.stringify(propdata));
        console.log(data.files);
        for(var key in data.files)
        {
            formData.append('proppics', data.files[key]);
        }


        console.log(formData.proppics);
        axios.post('http://localhost:3001/uploadproperty', formData)
            .then((result) => {
                if(result.status === 200 && result.data === 'Successfully uploaded Propert') {
                    alert('Property Uploaded Successfully');
                    this.setState({uploaded : true});
                }
            });

    }

    render() {

        if(cookies.load('cookie') === 'traveller')
        {
            return(
                <Redirect to='/Ownerlogin'/>
            )
        }
        else {
            if(this.state.uploaded)
            {
                return(
                    <Redirect to='/OwnerDashboard'/>
                )
            }
            else {
                return (
                    <div>
                        <Navbarhome/>
                        <div className="d-flex flex-column">
                            <div className="container">
                                <div className="row">
                                    <div className="GreyTabs col-4">
                                        <ul className="nav nav-pills flex-column">
                                            <li className="nav-item"><a href="" className="active nav-link"
                                                                        data-toggle="pill"
                                                                        data-target="#location">Location</a></li>
                                            <li className="nav-item"><a className="nav-link" href="" data-toggle="pill"
                                                                        data-target="#details">Details</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#booking">Booking Options</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#photos">Photos</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#pricing">Pricing</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#payments">Submit Property</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-8">
                                        <div className="tab-content">
                                            <div className="tab-pane fade show active" id="location" role="tabpanel">
                                                <Location
                                                    setLocation={location => this.setState({location: location})}/>
                                            </div>
                                            <div className="tab-pane fade" id="details" role="tabpanel">
                                                <Description
                                                    setpropname={propname => this.setState({propname})}
                                                    setproptype={proptype => this.setState({proptype})}
                                                    setpropdesc={propdesc => this.setState({propdesc})}
                                                    setBed={bed => this.setState({bed})}
                                                    setBath={bath => this.setState({bath})}
                                                    setCapacity={capacity => this.setState({capacity})}
                                                />
                                            </div>
                                            <div className="tab-pane fade" id="booking" role="tabpanel">
                                                <BookingOptions
                                                    setOptions={bookingoptions => this.setState({bookingoptions})}/>
                                            </div>
                                            <div className="tab-pane fade" id="photos" role="tabpanel">
                                                <AddPhotos setPhotos={files => this.setState({files})}/>
                                            </div>
                                            <div className="tab-pane fade" id="pricing" role="tabpanel">
                                                <Pricing
                                                    setFrom={from => this.setState({from})}
                                                    setTo={to => this.setState({to})}
                                                    setPrice={price => this.setState({price})}
                                                    setMinstay={minstay => this.setState({minstay})}/>
                                            </div>
                                            <div className="tab-pane fade" id="payments" role="tabpanel">
                                                <input type="checkbox" name="vehicle1" value="Bike"/> I hereby
                                                acknowledge
                                                that I have read, understand and agree to
                                                the terms of this leasing relating to Homeaway and
                                                payment of my services. <br></br>
                                                <button type="button" className="btn btn-primary"
                                                        onClick={(e) => this.submit(e)}>Submit the Property
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default ListProperty;