import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'
import commentsGen from "../data/commentsData.js"
import GenericComment from './GenericComment'
import WriteComment from './WriteComment'

import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/database';

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
                audioSegment: (1, 2)
            },
        ] ,
        votes: 0,
        audioSegment: (1, 2)
    }
]
*/






const Comment = ({comment}) => {
    const replies = comment.replies
    const [showComment, setShowComment] = useState(false);
    const addComment = (c) => {
        console.log(c)
    }
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
            {showComment &&  <WriteComment parent= {comment.id} reply={1} addComment = {addComment} />}

        </>
    )

}


const CommentSection = ({versionId, projectId}) => {
    const dispatch = useDispatch();
    const { database } = useSelector(state => state.database);
    console.log ("database - is here")
    console.log (database)

    const { panelState } = useSelector(state => state.homepagePanel);
    const { tabIndex } = useSelector(state => state.tabInfo);

    console.log ("tabIndex - is here")
    console.log (tabIndex)


    const _addComment = (payload) => {
        dispatch(addComment({payload}))
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

    const [comments, setComments] = useState(commentsGen (4));
    console.log ( comments );

    const addComment = (c) => {
        let newCom = comments;
        newCom.push(c);
        setComments (  newCom);

        console.log(c)
    }


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

            {showComment &&  <WriteComment parent = {false} reply={0} addComment = {addComment} />}

            {
                comments.map ( c => {  return <Comment reply = {0} comment = {c} />} )    
            }
            

        </div>
        </>
  )
}

export default CommentSection
