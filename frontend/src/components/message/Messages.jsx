import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
   const { loading, messages } = useGetMessages();
   useListenMessages()
   const lastMessageRef = useRef()

   useEffect(() => {
      setTimeout(() => {
         lastMessageRef.current?.scrollIntoView({
            behavior: "smooth"
         })
      }, 100)
   }, [messages])

   return (
      <div className='px-2 flex-1 overflow-auto'>
         {loading ? (
            <span className='loading loading-spinner mx-auto'></span>
         ) : messages && messages.length > 0 ? (
            messages.map(message => (<div ref={lastMessageRef} key={message._id}>
               <Message message={message} />
            </div>

            ))
         ) : (
            <p className="text-center text-gray-600 py-8">No messages yet.</p>
         )}
      </div>
   );
};

export default Messages;
