import React,{Component} from 'react';
import Nav from './Nav';
import firebase from 'firebase';
import './css/SignUp.css';

class SignUp extends Component{

    state={
        Name:'',
        Email:'',
        Password:''

    };

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.Email,this.state.Password)
        .then((result)=>{
            {
                if(result.additionalUserInfo.isNewUser===true)
                {
                        firebase.database().ref().child('UserRecord').push().set({
                            Name:this.state.Name,
                            Email:this.state.Email,
                            Password:this.state.Password
                        });
                }
            }
            
        })
        
    }
    render(){
    return(
        <div className="signUp">
            <Nav />
            <form className="form" onSubmit={this.handleSubmit}>
                <input type="text" name="Name" value={this.state.Name} onChange={this.handleInput} placeholder="Enter Name" />
                <input type="email" name="Email" value={this.state.Email} onChange={this.handleInput} placeholder="Enter Email" />
                <input type="password" name="Password" value={this.state.Password} onChange={this.handleInput} placeholder="Enter Password" />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
    }
}
export default SignUp;