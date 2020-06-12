import axios from 'axios';
import React from 'react';

export default class Login extends React.Component{


state={
    loginUsername: "",
    loginPassword: "",
    signupUsername: "",
    signupPassword: "",
    errors: [],
    successMessage: "",
    toggleLogin: false
}

formFilledOut=(event)=>{
    this.setState({
        [event.target.name]: event.target.value
    })
}

getJWT() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) return { token: JSON.parse(jwt).accessToken, id: JSON.parse(jwt).id };
    else return null;
  }
  

loginFormSubmitted=(event)=>{
    event.preventDefault();

    axios.post("/login", {
        email: this.state.loginUsername,
        password: this.state.loginPassword
    })
    .then(res => {
        if (res.status === 200) {
            localStorage.setItem("jwt", JSON.stringify(res.data));
            this.props.history.push("/");
        } else {
            const error = new Error(res.error);
            throw error;
        }
    })
    .catch(err => {
        console.log(err);
    });

    this.setState({
        loginUsername: "",
        loginPassword: "",
        errors: [],
        successMessage: ""
    })
}

submitSignupForm=(event)=>{
    event.preventDefault();

    console.log("signup form submitted");

    this.setState({
        signupUsername: "",
        signupPassword: "",
        errors: [],
        successMessage: ""
    })

    axios.post("/register", {
        username: this.state.signupUsername,
        password: this.state.signupPassword
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response.data);
    });
}

toggleSignIn=()=>{
    this.setState({
        toggleLogin: !this.state.toggleLogin
    })
}

    render(){

        return(

        <React.Fragment>

            { this.state.toggleLogin ?

            <div className="containers-for-login-page">

                {this.state.errors ?
                <p className="login-and-signup-messages">{this.state.errors}</p>
                :
                <p className="login--and-signup-messages">{this.state.SuccessMessage}</p>
                }

            <h1 className="heading">Donation4U</h1>

            <form onSubmit={this.submitSignupForm} className= "forms">
                <p className="login-labels">Username</p>
                <input className="login-and-signup-form-fields" type="text" name="signupUsername" value={this.state.signupUsername} onChange={this.formFilledOut}/>
                <p className="login-labels">Password</p>
                <input className="login-and-signup-form-fields" type="text" name="signupPassword" value={this.state.signupPassword} onChange={this.formFilledOut}/>
                <br></br>
                <input className="submit-buttons" type="submit" value="Register" />
            </form>

            <h3 className="toggle-login" onClick= {this.toggleSignIn}>Login</h3>


            </div>

            :

            <div className="containers-for-login-page">

                {this.state.errors ?
                <p className="login-and-signup-messages">{this.state.errors}</p>
                :
                <p className="login--and-signup-messages">{this.state.SuccessMessage}</p>
                }
            
            {
            this.state.errors ? 
            <p className="login-messages">{this.state.errors}</p>
            :
            <p className="login-messages">{this.state.SuccessMessage}</p>
             }

            <h1 className="heading">Donation4U</h1>            

            <form onSubmit={this.loginFormSubmitted} className= "forms">
                <p className="login-labels">Username</p>
                <input id="username" className="login-and-signup-form-fields" type="text" name="loginUsername" value={this.state.loginUsername} onChange={this.formFilledOut}/>
                <p className="login-labels">Password</p>
                <input className="login-and-signup-form-fields" type="text" name="loginPassword" value={this.state.loginPassword} onChange={this.formFilledOut}/>
                <br></br>
                <input className="submit-buttons" type="submit" value="Login" />
            </form>

            <h3 className= "toggle-login" onClick= {this.toggleSignIn}>Register</h3> 

            </div>

            }

        </React.Fragment>

        )
    }
}