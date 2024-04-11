import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import axios from 'axios';

const useGetMessages = () => {
   const [loading, setLoading] = useState(false)
   const { messages, setMessages, selectedConversation } = useConversation();

   const getMessages = async () => {
      try {
         const res = await axios.get(`/api/messages/${selectedConversation._id}`);
         if (res.data.error) throw new Error(res.data.error)
         //console.log(res.data)
         else setMessages(res?.data)
      } catch (error) {
         toast.error(error.message);
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      // Only run when a conversation is selected
      if (!selectedConversation._id) return;
      getMessages()
   }, [selectedConversation?._id, setMessages])

   return { loading, messages }
}

export default useGetMessages

// import React from "react";
// import Message from "./Message";
// import useGetMessages from "../../hooks/useGetMessages";

// const Messages = () => {
//   const { loading, messages } = useGetMessages();

//   if (loading) {
//     return <span className="loading loading-spinner mx-auto"></span>;
//   }

//   if (!messages || !Array.isArray(messages) || messages.length === 0) {
//     return <p className="text-center text-gray-600 py-8">No messages yet.</p>;
//   }

//   return (
//     <div className="px-2 flex-1 overflow-auto">
//       {messages.map((message) => (
//         <Message key={message._id} message={message} />
//       ))}
//     </div>
//   );
// };

// export default Messages;
