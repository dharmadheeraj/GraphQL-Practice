import React, { Component } from 'react';
import axios from 'axios';
import '../css/Userlogin.css';
import cookies from 'react-cookies';


class UserForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : '',
            password: '',
            email: '',
            signup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.signup =  this.signup.bind(this);
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

    submit = (e) =>
    {
        //prevent page from refresh
        e.preventDefault();

        console.log("In login post");
        let data = {
            username: this.state.username,
            password: this.state.password,
            type : 'traveller'

        }
        axios.post('http://localhost:3001/login',data,{withCredentials:true})
            .then(response => {
                let status = response.data;
                console.log(status);

                if(response.status === 200)
                {
                    this.props.auth(true);
                    console.log(cookies.load('cookie'));
                    console.log(cookies.load('userid'));
                }
                else
                {
                    this.props.auth(false);
                    alert("Please enter a valid Username/Password");
                }
            })
    }

    signup = (e) =>
    {
        e.preventDefault();
        console.log("In Signuo post");
        let data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            type:'Traveller'

        }
        axios.post('http://localhost:3001/createuser',data)
            .then(response => {
                if(response.status === 200 && response.data === 'Successfully created')
                {
                    this.setState({signup:false});
                    alert("User created successfully");

                }
                else
                {
                    this.setState({signup:true});
                    alert("Please try again after some time");
                }
            })
    }

    render()
    {
        var signin = (
            <div className="login-form" >
            <h1> Taveller Login </h1>
            <h4>Dont have an account?</h4>
                <button type="button" className="btn btn-link" onClick={ () => this.setState({signup:true})}> Sign Up</button>
            <hr></hr>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                           name="username" aria-describedby="emailHelp" placeholder="Enter Username" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password" name="password" onChange={this.handleChange} />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                </div>
                <button className="btn btn-primary" onClick={this.submit}>Login</button>
            </form>
            </div>
        )

        var signup = (
            <div className="login-form" >
                <h1> Taveller Signup </h1>
                <h4>Already have an account?</h4> <button type="button" className="btn btn-link" onClick={ () => this.setState({signup:false})}> Sign In</button>
                <hr></hr>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                           name="username" aria-describedby="emailHelp" placeholder="Enter Username" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                           name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your
                        email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password" name="password" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary" onClick={this.signup}>Signup</button>
            </form>
            </div>
        )

        let show = null;
        if (this.state.signup)
        {
            show = signup;
        }
        else
        {
            show = signin;
        }
        return(


                <div className="Userlogin-container">

                     <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12 align-content-center">


                                {show}

                        </div>
                </div>

        )

    }
}

export default UserForm;

