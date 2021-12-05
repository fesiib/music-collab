
import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'
import { useDispatch, useSelector } from 'react-redux';

const WriteComment = ({addCommentComp, reply, authorId, parentCommentId}) => {
    const {projects, profiles} = useSelector(state => state.database);

    let userName, profilePic;
    if (profiles[authorId]) {
        userName = profiles[authorId]["metaInfo"]["name"];
        profilePic = profiles[authorId]["metaInfo"]["profileImage"];
    }
    
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log ("comment - from WriteComment");
        console.log (comment);

        const newComment = {
            id: Math.floor(Math.random() * 1240),
            commentMessage: comment,
            comment: comment, 
            timeStamp: Date.now(),
            votes: 0,
            parentCommentId: parentCommentId,
            audioSegment: {start: 0, finish: 0}

            //  authorId: 'bob',
            //  commentMessage: "This is amazing!",
            //  parentCommentId: null,
            //  votes: 0,
            //  audioSegment: {start: 0, finish: 0},
            //  creationTime: new Date(1),
        }
        addCommentComp (newComment);
        event.target.reset();
        // alert(`Submitting Name ${comment}`)

    }

    return (

        <div className = "flex flex-raw">
        
        {reply >= 1 &&
            <div className = "flex-none w-35 text-white">
            ......
            </div>
        }
        
        <div className = "flex-grow">
        <div className = "bg-gray-100 flex flex-col rounded-3xl filter drop-shadow-lg py-3 px-3 mb-2 ">
            <div className = "flex flex-row  ">
                
                <div className = "flex-none  w-14	 " >
                    <img class="w-14 h-14 rounded-full object-cover" src= {profilePic} />
                </div>
                <div className = "flex-none  flex flex-col	 w-11/12" >
                    <div className = "flex-grow  flex flex-row px-3  gap-x-3 " >
                        <p className = "text-indigo-500 text  text-sm	" > {userName} </p>
                    </div>

                    <div className = "flex-grow px-3 w-full">
                        <form  onSubmit={handleSubmit}> 
                            <textarea
                                id="comment-text-area"
                                class="form-textarea "
                                rows="3"
                                placeholder="Write your comment here."
                                onChange={e => setComment(e.target.value)}
                                className="p-2 w-full border-2 border-gray-300 rounded-lg"
                                />
                            
                            <span className = "float-right px-2" > 
                                <GenericButton  className="text-s my-2" title = "Comment"/> 
                            </span>
                        </form  >

                        <span className = "float-right px-2" > 
                                <GenericButton  className="text-s my-2 bg-black" title = "Cancel" 
                                    onClick={() => {
                                        addCommentComp(null);
                                    }}
                                /> 
                        </span>
                    </div>
                    
                </div> 
                </div>
            </div> 
            </div>

            </div>
    )
}

export default WriteComment;