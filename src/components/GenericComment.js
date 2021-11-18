import React, {useState} from 'react'

import GenericButton from './GenericButton'
import time_ago from './utils/timeAgo'
import ProfilePic from '../media/profile-svgrepo-com.svg';

// import DownVote from '../icons/downvote-version.js'
import UpDownVote from '../icons/up-down-vote.js'

import { useDispatch, useSelector } from 'react-redux';
import { changeVoteComment } from '../reducers/database';



const GenericComment = ({comment, reply, showReply, versionId, projectId}) => {
/* payload format
    projectId,
    versionId,
    commentId,
    votes,
*/ 
    const dispatch = useDispatch();
    const id = comment.id;
    const authorId = comment.authorId;

    const contend = comment.commentMessage;
    const timeStamp = comment.timeStamp;
    const votes = comment.votes;
    const time_dif = time_ago (timeStamp);
    
    
    const [voted, setVoted ]= useState (0);  // 0 for none 1 for up -1 for down
    const upVote = ()=> {

        if (voted == 1) {
            return;
        }
        if (voted ==0) {
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
        if (voted ==-1) {
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
    }

    const downVote = ()=> {
        if (voted == -1) {
            return;
        }
        if (voted ==0) {
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
        if (voted ==1) {
            setVoted (0);
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
    }

    const {projects, profiles} = useSelector(state => state.database);
    const userName =  profiles[authorId]["metaInfo"]["name"];
    const profilePic =  profiles[authorId]["metaInfo"]["profileImage"];

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


            <div className= " w-full flex flex-raw  h-8 text-indigo-500 px-3  ">

                <div className= " flex-none w-8 text-2xl	">
                    {votes}
                </div>
                <div className= " flex-none w-8 text-indigo-500 cursor-pointer hover:text-indigo-600"  onClick = {upVote} >
                    <UpDownVote  up_down = "up"/>
                    
                </div>
                <div className= " flex-none w-8 text-indigo-500 cursor-pointer hover:text-indigo-600" onClick = {downVote}>
                    <UpDownVote up_down = "down"/>
                </div>
                <div className= " flex-grow"> </div>
                
                {
                    reply===0 &&
                    <div className= " flex-none m-auto"> 
                    <GenericButton onClick = { showReply } className="text-xs mx-auto  px-2 py-0" title = {"reply"}/>
                </div>
                }
            </div>
        </div>

        </div>

        </div>

        
    )
}

export default GenericComment;