import React,{Component} from "react";

class Location extends Component {
constructor(props)
{
    super(props);
    this.state = {
        location : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
}

    handleChange = (e) =>
    {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSave = (e) =>
    {
        this.props.setLocation(this.state.location);
    }
    render()
    {
        return(
            <div>
                <h3>Verify the Location of your Rental Address</h3>
                <hr></hr>
                <div className="form-group"><label>Enter your Location</label>
                    <input type="text" className="form-control form-control-lg" name="location" placeholder="Enter Location" onChange={ (e) => this.handleChange(e)}/>
                    <small className="form-text text-muted">We're happy to se you renting
                    </small>
                </div>

                <button type="button" className="btn btn-primary" onClick={ (e) => this.handleSave(e)}>Save</button>

            </div>
        )
    }
}

export default Location;
