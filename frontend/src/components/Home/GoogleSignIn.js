import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';

const GoogleSignIn = () =>{
    const [State,setState] = useState({
        isLoggedIn:false,
        Email:''
    });
    const handleSignIn = () =>{

                        var provider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(provider).then(function(result)
                         {
                             const user = result.user;
                            if(result.additionalUserInfo.isNewUser===true)
                            {
                                    firebase.database().ref().child('UserRecord').push().set({
                                        Name:user.displayName,
                                        Email:user.email,
                                    });
                            }
                            setState({
                                Email:user.email,
                                isLoggedIn:true
                            })
                            
                        }).catch(function(error) {
                            var errorCode = error.code;
                                console.log(errorCode);
                            var errorMessage = error.message;
                                console.log(errorMessage);
                            var email = error.email;
                                console.log(email);
                        });
    }

    if(State.isLoggedIn===true)
    {
        return <Redirect to={`/userprofile/${State.Email}`} />
    }
    else
    {
        return(
            <div>
                <button 
                    style={{
                        backgroundColor:'#dd4b39',
                        height:'40px',
                        color:'white',
                        border:'none',
                        marginLeft:'5px',
                        width:'280px',
                        fontSize:'15px'
                        }} 
                    onClick={handleSignIn}
                >SignIn With Google</button>
            </div>
        );
    }
    
}
export default GoogleSignIn;