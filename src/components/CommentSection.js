import React, {useState} from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'
import commentsGen from "../data/commentsData.js"
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

function time_ago(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }





const GenericComment = ({comment, reply, showReply}) => {
    const id = comment.id
    const author = comment.author
    const contend = comment.contend
    const timeStamp = comment.timeStamp
    const votes = comment.votes
    const time_dif = time_ago (timeStamp)
    

    return (

        <div className = "flex flex-raw">
        
        {reply >= 1 &&
            <div className = "flex-none w-35 text-white">
            ........
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
                        <p className = "text-primary text  text-sm	" > {author} </p>
                        <p className = "text-gray-600 text-sm	" > {time_dif} </p>
                    </div>

                    <div className = "flex-grow px-3 w-full  ">
                        <p  class ="break-normal" >
                            {contend}
                        </p> 
                    </div>
                    
                </div> 

            </div> 


            <div className= " w-full flex flex-raw  h-8 text-primary px-3  ">

                <div className= " flex-none w-8 text-2xl	">
                    {votes}
                </div>
                <div className= " flex-none w-8 ">
                    <svg class="h-7 w-7 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                    </svg>
                </div>
                <div className= " flex-none w-8">
                    <svg class="h-7 w-7 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                        <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                    </svg>
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

const WriteComment = ({addComment, reply, parent}) => {
    const c = {
        id: Math.floor(Math.random() * 1240),
        author: "Alan Shui",
        contend: "write your comment here...",
        
    }
    const author = c.author;
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            id: Math.floor(Math.random() * 1240),
            author: author,
            contend: comment,
            timeStamp: Date.now(),
            votes: 0,
            parent: parent,
            replies: []
        }
        addComment (newComment);
        setComment ('');
        event.target.reset();
        // alert(`Submitting Name ${comment}`)

    }

    return (

        <div className = "flex flex-raw">
        
        {reply >= 1 &&
            <div className = "flex-none w-35 text-white">
            ........
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
                        <p className = "text-primary text  text-sm	" > {author} </p>
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

const CommentSection = () => {

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
