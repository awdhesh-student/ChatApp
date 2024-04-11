import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Converstaion = ({ conversation }) => {
   const { selectedConversation, setSelectedConversation } = useConversation()

   const isSelected = selectedConversation?._id === conversation._id

   const { onlineUsers } = useSocketContext()
   const isOnline = onlineUsers?.includes(conversation._id)
   
   return (
      <>
         <div onClick={() => setSelectedConversation(conversation)} className={`flex gap-2 items-center hover:bg-orange-700 rounded p-2 py-1 cursor-pointer${isSelected ? "bg-orange-700" : ""}`}>
            <div className={`avatar ${isOnline ? "online": "" }`}>
               <div className="w-12 rounded-full">
                  <img src={conversation.profilePic} alt="user" />
               </div>
            </div>
            <div className="flex flex-col flex-1 mx-4">
               <div className="flex gap-3 justify-between">
                  <div className="font-bold text-grey-500">{conversation.fullName}</div>
               </div>
            </div>
         </div>
         <div className="divider px-3"></div>
      </>
   )
}

export default Converstaion
