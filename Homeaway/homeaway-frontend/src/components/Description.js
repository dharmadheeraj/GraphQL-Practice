import React,{Component} from "react";

class Description extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            propname : '',
            proptype : 'Appartment',
            propdesc : '',
            bed : '',
            bath : '',
            capacity : ''
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
        this.props.setpropname(this.state.propname);
        this.props.setproptype(this.state.proptype);
        this.props.setpropdesc(this.state.propdesc);
        this.props.setBed(this.state.bed);
        this.props.setBath(this.state.bath);
        this.props.setCapacity(this.state.capacity);
    }

    render()
    {
        return(
            <div>
                <h3>Describe your Property</h3>
                <hr></hr>
                <div className="form-group col-lg-8"><label>Property Name</label>
                    <input type="text" className="form-control form-control-lg" placeholder="Enter Property Name" name="propname" onChange={this.handleChange}/>
                </div>
                <div className="form-group col-lg-12">
                    <label>Description</label>
                    <textarea className="form-control form-control-lg" rows="5" id="description" placeholder="Enter description" name="propdesc" onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group col-lg-6">
                    <label>Property Type</label>
                    <select className="form-control form-control-lg" id="type" name="proptype" onChange={this.handleChange}>
                        <option value="Appartment">Appartment</option>
                        <option value="Villa">Villa</option>
                        <option value="House">House</option>
                    </select>
                </div>
            <div className="row">
                <div className="form-group col-lg-6">
                    <input type="number" className="form-control form-control-lg" placeholder="No OF Bed" name="bed" onChange={this.handleChange}/>
                </div>
                <div className="form-group col-lg-6">
                    <input type="number" className="form-control form-control-lg" placeholder="No Of bath" name="bath" onChange={this.handleChange}/>
                </div>
            </div>
                <div className="form-group col-lg-6">
                    <input type="number" className="form-control form-control-lg" placeholder="Accomodates" name="capacity" onChange={this.handleChange}/>
                </div>

                <button type="button" className="btn btn-primary" onClick={(e) => this.handleSave(e)}>Save</button>

            </div>
        )
    }
}

export default Description;