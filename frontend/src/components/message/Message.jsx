import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

const Message = ({message}) => {
   const { authUser } = useAuthContext()
   const { selectedConversation } = useConversation()
   
   const fromMe = message?.senderId === authUser?._id
   const chatClassName = fromMe ? "chat-end" : "chat-start"
   const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
   const bubbleColor = fromMe ? "bg-orange-700" : ""  

   const  timeStamp = new Date(message.createdAt).toLocaleTimeString('en-US')
   return (
      <>
         <div className={`chat chat-start ${chatClassName}`}>
            <div className="chat-image avatar">
               <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS chat bubble component" src={`${profilePic}`} />
               </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleColor} pb-2`}>
               <p>{message.messages}</p>
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{timeStamp}</div>

         </div>
      </>
   )
}

export default Message
