import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Compress from 'compress.js';
import firebase from '../../Firebase';
import './css/Profile.css';

class Profile extends Component{
    state={
        isLoggedOut:false,
        email:this.props.match.params.email,
        userName:'',
        file:null,
        fileType:'',
        userImage:'',
        imageURL:'',
        fileUpload:'',
        userKey:''
    }
    componentDidMount(){
        firebase.database().ref().child('UserRecord')
        .once('value',data=>{
                data.forEach(key => {
                    if(this.props.match.params.email===key.val().Email)
                    {
                        console.log(key.val().profileImage);
                        this.setState({
                            userName:key.val().Name,
                            userImage:key.val().profileImage
                        })
                    }
                });
        })

        firebase.database().ref().child('UserRecord')
        .once('value',users=>{
                users.forEach(user => {
                    if(this.props.match.params.email===user.val().Email)
                    {
                        this.setState({userKey:user.key})
                    }
                });
        })
    }
    LogOut = () =>{
        this.setState({isLoggedOut:true})
    }

    getFile = (e) =>{

        var File= e.target.files[0]
            let compress = new Compress()
            compress.compress([File], {
              size: 1, // the max size in MB, defaults to 2MB
              quality: .75, // the quality of the image, max is 1,
              maxWidth: 1024, // the max width of the output image, defaults to 1920px
              maxHeight: 768, // the max height of the output image, defaults to 1920px
              resize: true, // defaults to true, set false if you do not want to resize the image width and height
            }).then((data) => {
              this.setState({fileUpload:data[0]})
            }) 


        var type = e.target.files[0].type.split('/');    
        this.setState({
            fileType:type[1]
        });  
        
        
    }
    uploadFile = () =>{
        const base64str = this.state.fileUpload.data
    const imgExt = this.state.fileUpload.ext
    const compressedFile = Compress.convertBase64ToFile(base64str, imgExt)
        
        var email = this.state.email.split("@");
        var storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child(`images/${email[0]}.${this.state.fileType}`);
    
        mountainImagesRef.put(compressedFile).then(()=> {
            mountainImagesRef.getDownloadURL().then((url)=>{
                firebase.database().ref().child('UserRecord')
                .child(this.state.userKey).update({
                    profileImage:url
                }).then(()=>{this.setState({userImage:url})})
                
              }).catch(function(error) {
                    console.log(error);
              });
        });  
        
        setTimeout(() => {

            

        }, 3000);
            
    }
    
    render(){
        var data = this.props.match;
        if(this.state.isLoggedOut===true)
        {
            return <Redirect to="/signin" />
        }
        else
        {
            return(
                <div className="profileContainer">
                        <div className="header">
                            <h1>Socialogy</h1>
                            <ul>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}`}>Posts</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}/mystories`}>My Stories</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}/profile`}>Profile</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to='#' onClick={this.LogOut}>Log Out</Link></li>
                            </ul>
                        </div>
                        <div className="profileBody">
                            <div className="profile">
                                <div className="myImage">
                                    <img style={{width:'300px',height:'250px',backgroundColor:'gray'}} src={this.state.userImage} /> 
                                    <div className="uploadFile">
                                        <input type="file" onChange={this.getFile} />
                                        <i className="material-icons" onClick={this.uploadFile}>file_upload</i>
                                    </div>    
                                </div>
                                <div className="myData">
                                    <h4>Name : {this.state.userName}</h4>
                                    <h4>Email : {this.props.match.params.email}</h4>
                                </div>

                            </div>
                        </div>
                </div> 
            );
        }  
    }
}

export default Profile;