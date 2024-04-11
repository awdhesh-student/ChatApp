import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import useConversation from '../../zustand/useConversation';
import useGetConverstaion from "../../hooks/useGetConversation"
import toast from 'react-hot-toast';

const SearchInput = () => {
   const [serach, setSerach] = useState("")
   const { setSelectedConversation } = useConversation()
   const { conversations } = useGetConverstaion()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!serach) return;
      if (serach.length < 3) {
         return toast.error("Serach item must be 3 characters long atleast!")
      }

      const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(serach.toLowerCase()))

      if (conversation) {
         setSelectedConversation(conversation)
         setSerach('')
      } else {
         toast.error("No user found")
      }
   }
   return (
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
         <input type="text" value={serach} onChange={(e) => setSerach(e.target.value)} className='input input-bordered rounded-full' placeholder='serach' />
         <button type='submit' className='btn btn-circle bg-orange-700 text-white'><AiOutlineSearch /></button>
      </form>
   )
}

export default SearchInput
