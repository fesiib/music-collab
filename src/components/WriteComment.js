
import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'

const WriteComment = ({addCommentComp, reply, authorId, parentCommentId}) => {
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
        <div className = "flex flex-col border-1    rounded-3xl border border-black pt-2 px-1 ">
            <div className = "flex flex-row  ">
                
                <div className = "flex-none  w-14	 " >
                    <img src= {ProfilePic} />
                </div>
                <div className = "flex-none  flex flex-col	 w-11/12" >
                    <div className = "flex-grow  flex flex-row px-3  gap-x-3 " >
                        <p className = "text-primary text  text-sm	" > {authorId} </p>
                    </div>

                    <div className = "flex-grow px-3 w-full  pb-1">
                        
                    <form  onSubmit={handleSubmit}> 
                        <textarea
                            id="comment-text-area"
                            class="form-textarea mt-1 block w-full"
                            rows="3"
                            placeholder="Write your comment here."
                            onChange={e => setComment(e.target.value)}
                            ></textarea>
                        <span className = "float-right px-2" > 
                            <GenericButton  className="text-xs mx-auto  px-2 py-0" title = "comment"/> 
                        </span>
                        
                    </form  >
                    </div>
                    
                </div> 
                </div>
            </div> 
            </div>

            </div>
    )
}

export default WriteComment;