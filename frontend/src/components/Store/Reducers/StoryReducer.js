import StoryData from '../States/StoryState';

const StoryReducer = (state=StoryData,action) =>{
    switch (action.type) {
        case 'CREATE':
            return{
                storyData:state.storyData.concat(action.payload)
            }
        case 'READ':
            return{
                ...state,
                storyData:action.payload
            }
        case 'ADDCOMMENT':
            const newArr = state.storyData.map((stories)=>{
                if(stories._id===action.payload._id)
                {
                    return action.payload
                }
                else
                {
                    return stories
                }
            })
            return{
                ...state,
                storyData:newArr 
            }
        case 'DELETESTORY':
                const newStory = state.storyData.map((stories)=>{
                    if(stories._id===action.payload._id)
                    {
                        return state.storyData !== action.payload
                    }
                    else
                    {
                        return stories
                    }
                })
                return{
                    ...state,
                    storyData:newStory 
                }
            case 'DELETECOMMENT':
                const updatedStory = state.storyData.map((stories,i)=>{
                    if(stories._id==action.payload._id)
                    {   
                       stories.storyComments=action.payload.storyComments
                       return stories
                    }
                    else
                    {
                        return stories
                    }
                })
              return{
                    ...state,
                    storyData:updatedStory
                }
        case 'UPDATESTORY':{
            const newStory = state.storyData.map((stories,i)=>{
                if(stories._id==action.payload._id)
                {   
                   stories=action.payload
                   return stories
                }
                else
                {
                    return stories
                }
            });
            return{
                    ...state,
                    storyData:newStory
                }
        }
        default:
            return state;
    }
}
export default StoryReducer;