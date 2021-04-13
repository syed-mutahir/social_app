export const createStory = (data) =>{
    return(dispatch)=>{
         fetch('http://localhost:5000/create',{
            method:'Post',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res1=>{
            dispatch({type:'CREATE',payload:res1})
        })
    }
}

export const ReadStory = () =>{
    return(dispatch)=>{

        fetch('http://localhost:5000/getstorydata')
        .then(res=>res.json())
        .then(res1=>{
            dispatch({type:'READ',payload:res1.storyData})
        })
    }
}
export const addComment = (commentData) =>{
    return(dispatch)=>{
        fetch('http://localhost:5000/addcomment',{
            method:'put',
            body:JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
        })
        .then(res=>res.json())
        .then(res1=>{
            dispatch({type:"ADDCOMMENT",payload:res1});
        })
    }
}

export const deleteComment = (deleteCommentData) =>{
    return(dispatch)=>{
        fetch('http://localhost:5000/deletecomment',{
            method:'put',
            body:JSON.stringify(deleteCommentData),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res=>res.json())
        .then(res1=>{
            dispatch({type:"DELETECOMMENT",payload:res1});
        })
    }
}

export const deleteStory = (Id) =>{
    return(dispatch)=>{
        fetch('http://localhost:5000/deletestory',{
            method:'delete',
            body:JSON.stringify(Id),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res=>res.json())
        .then(res1=>{
            console.log(res1)
            dispatch({type:"DELETESTORY",payload:res1});
        })
    }
}

export const updateStory = (updatedStory) =>{
    return(dispatch)=>{
        fetch('http://localhost:5000/updatestory',{
            method:'put',
            body:JSON.stringify(updatedStory),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res=>res.json())
        .then(res1=>{
            dispatch({type:"UPDATESTORY",payload:res1});
        })
    }
}