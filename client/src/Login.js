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

loginFormSubmitted=(event)=>{
    event.preventDefault();

    this.setState({
        loginUsername: "",
        loginPassword: "",
        errors: [],
        successMessage: ""
    })
    axios.post("/login", {
        username: "a",
        password: "a"
    })
    .then(res => {
        if (res.status === 200) {
            console.log(res.data);
            this.props.history.push("/");
        } else {
            const error = new Error(res.error);
            throw error;
        }
    })
    .catch(err => {
        console.log(err);
    });
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
        username: "test",
        password: "test"
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
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

            <h3 className= "heading-for-forms">Create an account or <p className="toggle-login" onClick= {this.toggleSignIn}>Sign in</p>
</h3> 

            <form onSubmit={this.submitSignupForm} className= "forms">
                <input className="login-and-signup-form-fields" type="text" name="signupUsername" value={this.state.signupUsername} placeholder="create username" onChange={this.formFilledOut}/>
                <br></br>
                <input className="login-and-signup-form-fields" type="text" name="signupPassword" value={this.state.signupPassword} placeholder="enter a password" onChange={this.formFilledOut}/>
                <br></br>
                <input className="submit-buttons" type="submit" value="Sign up" />
            </form>

            </div>

            :

            <div className="containers-for-login-page">

                {this.state.errors ?
                <p className="login-and-signup-messages">{this.state.errors}</p>
                :
                <p className="login--and-signup-messages">{this.state.SuccessMessage}</p>
                }

            <h3 className= "heading-for-forms">Sign in or <p className= "toggle-login" onClick= {this.toggleSignIn}>Create an account</p></h3> 
            
            
            {
            this.state.errors ? 
            <p className="login-messages">{this.state.errors}</p>
            :
            <p className="login-messages">{this.state.SuccessMessage}</p>
             }

            <form onSubmit={this.loginFormSubmitted} className= "forms">
                <input className="login-and-signup-form-fields" type="text" name="loginUsername" value={this.state.loginUsername} placeholder="enter username" onChange={this.formFilledOut}/>
                <br></br>
                <input className="login-and-signup-form-fields" type="text" name="loginPassword" value={this.state.loginPassword} placeholder="enter password" onChange={this.formFilledOut}/>
                <br></br>
                <input className="submit-buttons" type="submit" value="Log In" />
            </form>

            </div>

            }

        </React.Fragment>

        )
    }
}