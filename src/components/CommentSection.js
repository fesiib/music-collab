import React from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';
import GenericButton from '../components/GenericButton'





const Comment = (props) => {

    return (
        <div className = "flex flex-col border-1  rounded-3xl border border-black pt-2 px-1 ">
            <div className = "flex flex-row  ">
                
                <div className = "flex-none  w-14	 " >
                    <img src= {ProfilePic} />
                </div>
                <div className = "flex-none  flex flex-col	 w-11/12" >
                    <div className = "flex-grow  flex flex-row px-3  gap-x-3 " >
                        <p className = "text-primary text  text-sm	" > Alan Zhi </p>
                        <p className = "text-gray-600 text-sm	" > 2 weeks </p>
                    </div>

                    <div className = "flex-grow px-3 w-full  ">
                        <p  class ="break-normal" >
                            text of the comment it keeps s text of the comment it keeps stext of the comment it keeps stext of the comment it keeps  stext of the comment it keeps
                        </p> 
                    </div>
                    
                </div> 

            </div> 


            <div className= " w-full flex flex-raw  h-8 text-primary px-3  ">

                <div className= " flex-none w-8 text-2xl	">
                    15
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
                
                <div className= " flex-none m-auto"> 
                    <GenericButton className="text-xs mx-auto  px-2" title = {"reply"}/>
                </div>

            </div>

        </div>

        
    )
}


const CommentSection = () => {
    return (
        <div className = "flex flex-col my-10 gap-y-2 h-full">
            Comments 

            <Comment  />
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>

        </div>
  )
}

export default CommentSection
