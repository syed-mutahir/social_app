import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {ReadStory,deleteStory,deleteComment,updateStory} from '../Store/Actions/StoryActions';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import firebase from '../../Firebase';
import './css/MyStories.css';


const customStyles = {
    content : {
      top                   : '20%',
      left                  : '20%',
      right                 : '20%',
      bottom                : '20%',
      color                 : 'white',
      background            : 'rgb(114, 29, 114)',
    }
  };

const formStyle = {
        display : 'flex',
        flexDirection : 'column',
        paddingTop     : '30px',
        paddingLeft     : '100px',
        paddingRight     : '100px',
}

Modal.setAppElement('body');

class MyStories extends Component{
    state={
        isLoggedOut:false,
        isModalOpen:false,
        storyTitle:'',
        Story:'',
        StoryId:''
    }

    componentDidMount(){
        firebase.database().ref().child('UserRecord')
        .once('value',data=>{
                data.forEach(key => {
                    if(this.props.match.params.email===key.val().Email)
                    {
                        this.setState({userName:key.val().Name})
                    }
                });
        })
        this.props.readStory();
    }
    LogOut = () =>{
        this.setState({isLoggedOut:true})
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
                <div className="myStoriesContainer">
                        <div className="header">
                            <h1>Socialogy</h1>
                            <ul>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}`}>Posts</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}/mystories`}>My Stories</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}/profile`}>Profile</Link></li>
                                <li><Link style={{textDecoration:'none',color:'white'}} to='#' onClick={this.LogOut}>Log Out</Link></li>
                            </ul>
                        </div>
                        <div className="stories">
                            <h1 style={{textAlign:'center'}}>My Stories</h1>
                            {
                                this.props.Stories.map((story,i)=>{
                                    if(story.authorEmail===data.params.email)
                                    {
                                        this.handleDelete = () =>{
                                            var storyId = {
                                                Id:story._id
                                            }
                                            this.props.DeleteStory(storyId);
                                        }
                                        this.openModal = ()=>{
                                            console.log(story._id);
                                            this.setState({
                                                isModalOpen:true,
                                                storyTitle:story.storyTitle,
                                                Story:story.storyDescription,
                                                storyId:story._id
                                            })
                                            
                                        }
                                        this.handleInput = (e) =>{
                                            this.setState({[e.target.name]:e.target.value})
                                        }
                                        
                                        this.handleUpdate = (e) =>{
                                            e.preventDefault();
                                            var data = {
                                                Id:this.state.storyId,
                                                storyTitle:this.state.storyTitle,
                                                storyDescription:this.state.Story
                                            }
                                            
                                            this.props.UpdateStory(data);
                                            this.setState({isModalOpen:false})
                                        }
                                        this.closeModal = () =>{
                                            this.setState({isModalOpen:false})
                                        }
                                        return (
                                                    <div key={i} className="storyContainer">
                                                        <Modal 
                                                            style={customStyles} 
                                                            isOpen={this.state.isModalOpen} 
                                                            onAfterOpen={this.afterOpen}
                                                            style={customStyles}
                                                        
                                                        >
                                                            <div className="modalHeader">
                                                                <i className="material-icons" onClick={this.closeModal}>close</i>
                                                            </div>
                                                            

                                                            <form style={formStyle} onSubmit={this.handleUpdate}>
                                                                <input name="storyTitle" style={{height:'30px',marginBottom:'5px'}} type="text" value={this.state.storyTitle} onChange={this.handleInput} />
                                                                <textarea name="Story" rows="10" style={{marginBottom:'5px'}}value={this.state.Story} onChange={this.handleInput}></textarea>
                                                                <input style={{backgroundColor:'seagreen',width:'150px',border:'none',height:'40px',color:'white'}} value="Update" type="submit" />
                                                            </form>
                                                        </Modal>
                                                        <div className="story">
                                                            <div className="storyHeader" style={{textAlign:'right'}} >
                                                                <i className="material-icons" onClick={this.openModal}>edit</i>
                                                                <i className="material-icons" onClick={this.handleDelete}>close</i>
                                                            </div>
                                                            <h4 style={{margin:'3px'}}>Author Name: {  story.authorName }</h4>
                                                            <h4 style={{margin:'3px'}}>Author Email: {  story.authorEmail }</h4>
                                                            <h2 style={{margin:'3px',marginTop:'10px'}}>{  story.storyTitle }</h2> 
                                                            <p style={{margin:'3px'}}>{  story.storyDescription }</p>   
                                                        </div>
                                                        <div className="commentSection">
                                                            <div className="comments">
                                                                {
                                                                    story.storyComments.map((comment,index)=>{
                                                                        this.handleCommentDelete = ()=>{
                                                                            var deleteCommentData = {
                                                                                storyId:story._id,
                                                                                commentIndex:index
                                                                            }
                                                                            this.props.DeleteComment(deleteCommentData);
                                                                        }
                                                                    return(
                                                                            <div key={index} className="comment">
                                                                                <p key={i}><i className="material-icons" style={{color:'gray'}}>comment</i> {comment}</p>
                                                                                <i className="material-icons icon-2" style={{color:'gray'}} onClick={this.handleCommentDelete}>delete</i>
                                                                            </div>
                                                                        ); 
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                        );
                                    }
                                })
                            }
                        </div>
                </div> 
            );
        }
        
    }
}
const mapStateToProps = (State) =>{
    return{
        Stories:State.storyData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        DeleteStory:(Id)=>dispatch(deleteStory(Id)),
        readStory:()=>dispatch(ReadStory()),
        DeleteComment:(data)=>dispatch(deleteComment(data)),
        UpdateStory:(updatedStory)=>dispatch(updateStory(updatedStory))
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(MyStories);