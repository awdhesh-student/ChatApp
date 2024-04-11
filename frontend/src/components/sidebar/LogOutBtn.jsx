import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogOut from '../../hooks/useLogOut';
const LogOutBtn = () => {

   const { loading, logout } = useLogOut()
   return (
      <div className='mt-auto'>
         <BiLogOut onClick={logout} className='w-6 h-6 cursor-pointer text-white' />
      </div>
   )
}

export default LogOutBtn
