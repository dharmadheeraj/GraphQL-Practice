import React , { Component } from 'react';
import '../css/Account.css';
import axios from "axios";

class Account extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            email : '',
            curpass : '',
            newpass : '',
            repass : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:3001/getaccount',{params: {id: this.props.userid}})
            .then( (response) =>
                {
                    this.setState({ email : response.data.ans[0].email});
                }

            )
    }


    submit = (e) =>
    {
        e.preventDefault();

        if(this.state.newpass === this.state.repass) {
            const accountdata = {
                email : this.state.email,
                curpass : this.state.curpass,
                newpass: this.state.newpass
            }

            //let formData = new FormData();

            //formData.append('accountdata', JSON.stringify(accountdata));
            console.log(JSON.stringify(accountdata));
                axios.post('http://localhost:3001/updateaccount', accountdata)
                .then((response) => {
                    if (response.status === 200 && response.data === 'Successful') {
                        alert('Password update successfully');
                        this.setState({curpass : '', newpass : '', repass : ''})
                    }
                    else {
                        alert('Current password does not match.');
                        this.setState({curpass : '', newpass : '', repass : ''})
                    }
                });
        }
        else
        {
            alert('Please check the reType password and submit again');
        }
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

    render()
    {
        return(
            <div className="account col-md-8 order-md-1">

                <h1 className="mb-3">Account</h1>
                <form className="needs-validation" noValidate="">

                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Emial Id</label>
                            <input type="email" className="form-control" name="email" placeholder="" value={this.state.email}
                                   required="" disabled/>
                        </div>

                        <div className="col-md-6 mb-3">
                            <h1 className="mb-3">Update Password</h1>
                            <label htmlFor="curpass">Current Password</label>
                            <input type="password" className="form-control" name="curpass" placeholder="" onChange={this.handleChange}
                                   required="" value={this.state.curpass}/>
                            <div className="invalid-feedback">
                                Valid current pass is required.
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="newpass">New Password</label>
                            <input type="password" className="form-control" name="newpass" placeholder=""
                                   required="" onChange={this.handleChange} value={this.state.newpass} />
                            <div className="invalid-feedback">
                                Valid new pass is required.
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="repass">Retype Password</label>
                            <input type="password" className="form-control" name="repass" placeholder=""
                                   required="" onChange={this.handleChange} value={this.state.repass} />
                            <div className="invalid-feedback">
                                Valid retype pass is required.
                            </div>
                        </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.submit}>Save Profile</button>
                </form>
            </div>
        )
    }
}

export default Account;