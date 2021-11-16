import React from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';

const VersionContributor = () => {

    return (
        <div className = "flex flex-row h-20 my-10 gap-x-6">

            <div className="flex-none w-20  h-full place-items-center border rounded-full pl-2">
                <svg className="w-full h-full p-4"   viewBox="0 0 48 48" version="1.1" >
                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="ic_fluent_play_48_filled" fill="#212121" fill-rule="nonzero">
                            <path d="M13.7501344,8.41212026 L38.1671892,21.1169293 C39.7594652,21.9454306 40.3786269,23.9078584 39.5501255,25.5001344 C39.2420737,26.0921715 38.7592263,26.5750189 38.1671892,26.8830707 L13.7501344,39.5878797 C12.1578584,40.4163811 10.1954306,39.7972194 9.36692926,38.2049434 C9.12586301,37.7416442 9,37.2270724 9,36.704809 L9,11.295191 C9,9.50026556 10.4550746,8.045191 12.25,8.045191 C12.6976544,8.045191 13.1396577,8.13766178 13.5485655,8.31589049 L13.7501344,8.41212026 Z" id="🎨-Color"></path>
                        </g>
                    </g>
                </svg>
            </div>

            <div className="flex-grow h-full  rounded-3xl border border-black px-5">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	 " >Description</div>
                    <div className = "flex-grow" >Message about the changes </div>
                </div>
                
            </div>
            <div className="flex-none w-56 h-full  ">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	 " >Contributor</div>
                    <div className = "flex-grow" >
                    <div className = "flex flex-row ">
                        <div className = "flex-none  w-14	 " >
                            <img src= {ProfilePic} />
                        </div>
                        <div className = "flex-grow p-2 px-4 " >
                            <p> Alan Zhi </p>
                            <p className = "text-gray-600" > 2 weeks </p>
                        </div>
                    </div>

                    </div>
                </div>


            </div>
        </div>
  )
}

export default VersionContributor
