import React, {useState} from 'react'

import GenericButton from './GenericButton'
import time_ago from './utils/timeAgo'
import ProfilePic from '../media/profile-svgrepo-com.svg';

// import DownVote from '../icons/downvote-version.js'
import UpDownVote from '../icons/up-down-vote.js'

import { useDispatch, useSelector } from 'react-redux';
import { changeVoteComment } from '../services/firebase_database';



const GenericComment = ({comment, reply, showReply, setShowReply, versionId, projectId}) => {
/* payload format
    projectId,
    versionId,
    commentId,
    votes,
*/ 

    console.log(comment);
    const dispatch = useDispatch();
    const id = comment.id;
    const authorId = comment.authorId;
    const contend = comment.commentMessage;
    const timeStamp = comment.creationTime;
    const votes = comment.votes;
    const time_dif = time_ago (timeStamp);
    
    
    const [voted, setVoted ]= useState (0);  // 0 for none 1 for up -1 for down
    const upVote = ()=> {

        if (voted ===  1) {
            setVoted(0)
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: -1,
            }
            dispatch (changeVoteComment ( payload ))    
            
        }
        if (voted === 0) {
            setVoted (1);
            console.log(comment);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: 1,
            }
            dispatch (changeVoteComment ( payload ))    
            return;
        }
        if (voted === -1) {
            setVoted (1);
            console.log(comment);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: 2,
            }
            dispatch (changeVoteComment ( payload ))    
            return;
        }
    }

    const downVote = ()=> {
        if (voted === -1) {
            setVoted (0);
            console.log(comment);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: 1,
            }
            dispatch (changeVoteComment ( payload ))    
            return;
        }
        if (voted === 0) {
            setVoted (-1);
            console.log(comment);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: -1,
            }
            dispatch (changeVoteComment ( payload ))    
            return;
        }
        if (voted === 1) {
            setVoted (-1);
            console.log(comment);
            const payload = {
                projectId: projectId,
                versionId: versionId, 
                commentId: comment.commentId,
                votes: -2,
            }
            dispatch (changeVoteComment ( payload ))    
            return;
        }
    }

    const {projects, profiles} = useSelector(state => state.database);
    let userName = ''  
    if (authorId in profiles && 'metaInfo' in profiles[authorId]) {    
        userName = profiles[authorId]["metaInfo"]["name"] || '';
    }
    let profilePic = ''
    //  profiles[authorId]["metaInfo"]["profileImage"];
    if (authorId in profiles && 'metaInfo' in profiles[authorId]) {    
        profilePic = profiles[authorId]["metaInfo"]["profileImage"] || '';
    }

    const upvoteColor = voted === 1 ? 'text-indigo-700' : 'text-indigo-400'
    const downvoteColor = voted === -1 ? 'text-indigo-700' : 'text-indigo-400'
    const textColor = voted !== 0 ? 'text-indigo-700' : 'text-indigo-500'

    return (

        <div className = "flex flex-raw">
        
        {reply >= 1 &&
            <div className = "flex-none w-35 text-white">
            ......
            </div>
        }
        

        <div className = "flex-grow">
        
        <div className = "flex flex-col rounded-3xl bg-gray-100 filter drop-shadow-lg py-3 px-3 mb-2">
            <div className = "flex flex-row  ">
                
                <div className = "flex-none  w-14	 " >
                    <img class="w-14 h-14 rounded-full object-cover" src= {profilePic} />
                </div>
                <div className = "flex-none  flex flex-col	 w-11/12" >
                    <div className = "flex-grow  flex flex-row px-3  gap-x-3 " >
                        <p className = "text-indigo-500 text  text-sm	" > {userName} </p>
                        <p className = "text-gray-600 text-sm	" > {time_dif} </p>
                    </div>

                    <div className = "flex-grow px-3 w-full  ">
                        <p  class ="break-normal" >
                            {contend}
                        </p> 
                    </div>
                    
                </div> 

            </div> 


            <div className= " w-full flex flex-raw  h-8 text-indigo-500 pl-16 pr-3">

                <div className= {` flex-none w-8 text-2xl ${textColor}`}>
                    {votes}
                </div>
                <div className=  {`flex-none w-8 ${upvoteColor} cursor-pointer hover:text-indigo-600`}  onClick = {upVote} >
                    <UpDownVote  up_down = "up"/>
                    
                </div>
                <div className= {`flex-none w-8  ${downvoteColor} cursor-pointer hover:text-indigo-600`} onClick = {downVote}>
                    <UpDownVote up_down = "down"/>
                </div>
                <div className= " flex-grow"> </div>
                
                {
                    reply===0 &&
                    <div className= " flex-none m-auto"> 
                        {
                            !showReply ?
                                <GenericButton onClick = { setShowReply } className="text-s mx-auto  px-2 py-0" title = {"reply"}/>
                            :
                                null
                        }
                </div>
                }
            </div>
        </div>

        </div>

        </div>

        
    )
}

export default GenericComment;