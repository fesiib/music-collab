import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'
import commentsGen from "../data/commentsData.js"
import GenericComment from './GenericComment'
import WriteComment from './WriteComment'

import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/database';
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

const Comment = ({comment, addCommentComp}) => {
    const replies = comment.replies
    const [showComment, setShowComment] = useState(false);
    return (
        <>
        <GenericComment reply = {0} showReply = {()=>setShowComment(!showComment)} write={false} comment={comment} />
        
            {
                replies.map ( c => { 
                    return (
                        <div>
                            <GenericComment  write={false} reply = {1} comment = {c} />

                        </div>
                        )
                })    
            }
            {showComment &&  <WriteComment parentCommentId= {comment.commentId} reply={1} addCommentComp = {addCommentComp} />}

        </>
    )

}


const CommentSection = ({versionId, projectId}) => {
    const dispatch = useDispatch();
    const {projects, profiles} = useSelector(state => state.database);
    const comments_object = projects[projectId]["versions"][versionId]["comments"];
    console.log (comments_object);

    
    const myUserId = "me";   //// TODO: Currently logged in user 
    const comments = changeCommentTree (comments_object);
    const _addComment = (payload) => {
    }

    const addCommentComp = (c) => {
        console.log("console.log(c);");
        console.log(c);
        const payload = {
            ...c, 
            projectId: projectId,
            versionId: versionId,
            authorId: myUserId,
        }

        console.log("payload");
        console.log(payload);
        dispatch(addComment(payload));


        // const {projects, profiles} = useSelector(state => state.database);
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

    


    return (
        <>
        <div className= " w-full flex flex-raw my-5 h-10 text-primary">

            <div className= " flex-none w-10 text-4xl	">
                15
            </div>
            <div className= " flex-none w-10 ">
                <svg class="h-10 w-10 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div className= " flex-none w-10">
                <svg class="h-10 w-10 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div className= " flex-grow"> </div>
            <div className= " flex-none "> 
                <GenericButton onClick = { () => setShowComment(!showComment) }  className="text-l mx-auto  px-2" title = {"comment"}/>
            </div>

        </div>

        <div className = "flex flex-col my-5 gap-y-2 h-full">
            Comments 

            {showComment &&  <WriteComment  parentCommentId = {null} reply={0} addCommentComp = {addCommentComp} />}

            {
                comments.map ( c => {  return <Comment addCommentComp = {addCommentComp}   reply = {0} comment = {c} />} )    
            }
            

        </div>
        </>
  )
}

export default CommentSection;
