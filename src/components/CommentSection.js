import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'
import commentsGen from "../data/commentsData.js"
import GenericComment from './GenericComment'
import WriteComment from './WriteComment'
import { useHistory } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { addComment, changeVoteVersion } from '../services/firebase_database';
import changeCommentTree from './utils/changeCommentTree'


/*
comments: [
    {
        author: "",
        comment: "",
        timeStamp: 0,
        replies: [
            {
                author: "",
                comment: "",
                timeStamp: 0,
                replies: [{
                    
                }] ,
                votes: 0,
            },
        ] ,
        votes: 0,
        audioSegment: (1, 2)
    }
]
*/

const Comment = ({comment, addCommentComp, versionId, projectId, authorId}) => {
    const replies = comment.replies

    const [showReplyComment, setShowReplyComment] = useState(false);

    const addReplyCommentComp = (c) => addCommentComp(c, setShowReplyComment)
    return (
        <>
        <GenericComment versionId = {versionId}  projectId = {projectId} reply = {0} showReply = {showReplyComment} setShowReply = {()=>setShowReplyComment(!showReplyComment)} write={false} comment={comment} />
            {showReplyComment &&  <WriteComment authorId = {authorId} parentCommentId= {comment.commentId} reply={1} addCommentComp = {addReplyCommentComp} />}
            {
                replies.map ( c => { 
                    return (
                        <div>
                            <GenericComment  versionId = {versionId}  projectId = {projectId} write={false} reply = {1} comment = {c} />
                        </div>
                        )
                })    
            }

        </>
    )

}


const CommentSection = ({versionId, projectId}) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const {projects, profiles} = useSelector(state => state.database);
    const comments_object = projects[projectId]["versions"][versionId]["comments"];
    const versionInfo = projects[projectId]["versions"][versionId]["metaInfo"];
    const votes = versionInfo["votes"];
    
    const {userId} = useSelector(state => state.authentication);
    console.log(userId, comments_object);
    const comments = changeCommentTree (comments_object);
    const addCommentComp = (c, setShowReplyComment) => {
        if (c === null) {
            setShowComment(false);
            if (typeof setShowReplyComment == 'function')
                setShowReplyComment(false);
        }
        console.log("console.log(c);");
        console.log(c);
        const payload = {
            ...c, 
            projectId: projectId,
            versionId: versionId,
            authorId: userId,
        }
        console.log("payload");
        console.log(payload);
        setShowComment(false);
        if (typeof setShowReplyComment == 'function')
            setShowReplyComment(false);
        dispatch(addComment(payload));
        console.log (projects);
    }

    /* payload format
        projectId,
        versionId,
        authorId,
        commentMessage,
        parentCommentId,
        audioSegment {start: 0, finish: 0}
        duration,
        tracks {url: '', type: ??},
    */
    const [showComment, setShowComment] = useState(false);
    

    const [voted, setVoted ]= useState (0);  // 0 for none 1 for up -1 for down
    
    const upVote = ()=> {
        if (voted === 1) {
            setVoted (0);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: -1,
            }
            dispatch (changeVoteVersion ( payload ))    
            
            return;
        }
        if (voted === 0) {
            setVoted (1);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: 1,
            }
            dispatch (changeVoteVersion ( payload ))    
            return;
        }
        if (voted === -1) {
            setVoted (1);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: 2,
            }
            dispatch (changeVoteVersion ( payload ))    
            return;
        }
    }

    const downVote = ()=> {
        if (voted === -1) {
            setVoted (0);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: 1,
            }
            dispatch (changeVoteVersion ( payload ))    
            return;
        }
        if (voted === 0) {
            setVoted (-1);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: -1,
            }
            dispatch (changeVoteVersion ( payload ))    
            return;
        }
        if (voted === 1) {
            setVoted (-1);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                votes: -2,
            }
            dispatch (changeVoteVersion ( payload ))    
            return;
        }
    }


    const upvoteColor = voted === 1 ? 'text-indigo-700' : 'text-indigo-400'
    const downvoteColor = voted === -1 ? 'text-indigo-700' : 'text-indigo-400'
    const textColor = voted !== 0 ? 'text-indigo-700' : 'text-indigo-500'

    return (
        <div className= " h-full " >
        <div className= {` w-full flex flex-raw my-5 h-10 ${textColor}`}>

            <div className= " flex-none w-10 text-4xl	">
                {votes}
            </div>
            <div  onClick = {upVote} className= " flex-none w-10 ">
                <svg class={`h-10 w-10 fill-current ${upvoteColor} cursor-pointer hover:text-indigo-700`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div onClick = {downVote} className= " flex-none w-10">
                <svg className = "" class={`h-10 w-10 fill-current ${downvoteColor} cursor-pointer hover:text-indigo-700`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div className= " flex-grow"> </div>

            <div className= " flex-none "> 
                {
                    showComment ? 
                        null
                        :
                        <GenericButton onClick = { () => setShowComment(!showComment) }  className="text-l mx-auto  px-2" title = {"Comment"}/>
                }
            </div>

        </div>

        <div className = "flex flex-col my-5 gap-y-2  overflow-y-auto  ">
            <h2 className="">
                Comments 
            </h2>

            {showComment &&  <WriteComment  authorId = {userId} parentCommentId = {null} reply={0} addCommentComp = {addCommentComp} />}

            {
                comments.length > 0 ?
                    comments.map ( c => {
                        return <Comment 
                            authorId = {userId}
                            versionId = {versionId}
                            projectId = {projectId}
                            addCommentComp = {addCommentComp}
                            reply = {0}
                            comment = {c}
                        />
                    } )    
                :
                    !showComment ? 
                        (<div className="p-2 mx-auto text-sm text-center filter drop-shadow-lg bg-gray-100 rounded-lg">
                            No comments, be first!
                        </div>)
                        :
                        null
            }
            

        </div>
        </div>
        
  )
}

export default CommentSection;
