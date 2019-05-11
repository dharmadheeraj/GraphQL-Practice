import React,{Component} from 'react';

class Pricing extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            from : '',
            to : '',
            price : '',
            minstay : ''
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
        this.props.setFrom(this.state.from);
        this.props.setTo(this.state.to);
        this.props.setPrice(this.state.price);
        this.props.setMinstay(this.state.minstay);
    }

    render()
    {
        return(
            <div>
                <h3>Availability</h3>
                <div className="form-row">
                    <div className="col-4">
                        <input type="date" name='from' className="form-control form-control-lg" placeholder="From Date" onChange={this.handleChange}/>
                    </div>
                    <div className="col-4">
                        <input type="date" name='to' className="form-control form-control-lg" placeholder="To Date" onChange={this.handleChange}/>
                    </div>
                </div>
                <hr></hr>

                <h3>How much do you want to charge</h3>
                <div className="form-group col-lg-6">
                    <input type="number" className="form-control form-control-lg" placeholder="$" name="price" onChange={this.handleChange}/>
                </div>
                <hr></hr>

                <h3>Minimun Stay</h3>
                <div className="form-group col-lg-6">
                    <input type="number" className="form-control form-control-lg" placeholder="No of Nights" name="minstay" onChange={this.handleChange}/>
                    <small className="form-text text-muted">Please specify the minimum days of stay
                    </small>
                </div>

                <button type="button" className="btn btn-primary" onClick={ (e) => this.handleSave(e)}>Save</button>

            </div>
        )
    }
}

export default Pricing;