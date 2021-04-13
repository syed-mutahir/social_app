import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Nav from './Nav';
import './css/Signin.css';
import GoogleSignIn from './GoogleSignIn';

class SignIn extends Component{

    state={
        Email:'',
        Password:'',
        isLoggedIn:false

    };

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password)
        .then((result)=>{
            if(result.operationType==='signIn')
            {
                this.setState({isLoggedIn:true});
            }
        })
    }
    render(){
        if(this.state.isLoggedIn===true)
        {
            return <Redirect to={`/userprofile/${this.state.Email}`} />
        }
        else
        {
            return(
                <div className="signIn">
                    <Nav />
                    <div className="signin-form">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <input type="email" name="Email" value={this.state.Email} onChange={this.handleInput} placeholder="Enter Email" />
                            <input type="password" name="Password" value={this.state.Password} onChange={this.handleInput} placeholder="Enter Password" />
                            <input type="submit" value="Log In" />
                        </form>
                    </div>
                    <div className="google-signin">
                        <GoogleSignIn />
                    </div>
                    
                </div>
            );
        } 
    }
}
export default SignIn;