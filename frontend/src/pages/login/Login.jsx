import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'


const Login = () => {
   const [user, setUser] = useState({
      username: "",
      password: ""
   })
   const { loading, login } = useLogin()

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      await login(user.username, user.password)
   }

   return (
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
         <div className="w-full p-6 rouded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login<span className='text-orange-700'>'it</span></h1>
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="username" className='label p-3'><span className='text-base label-text'>UserName</span></label>
                  <input
                     type="text"
                     value={user.username}
                     onChange={(e) => setUser({ ...user, username: e.target.value })}
                     placeholder='Enter Username'
                     className='w-full input input-bordered h-10'
                     onClick={(e) => e.stopPropagation()} /> 
               </div>

               <div>
                  <label htmlFor="password" className='label p-3'><span className='text-base label-text'>Password</span></label>
                  <input
                     type="password"
                     value={user.password}
                     onChange={(e) => setUser({ ...user, password: e.target.value })}
                     placeholder='Enter password'
                     className='w-full input input-bordered h-10'
                     onClick={(e) => e.stopPropagation()} /> 
               </div>
               <div>
                  <button className="btn btn-block btn-sm mt-8" type="submit">Login</button>
               </div>
               <Link to={'/register'} className='text-sm hover:underline hover:text-orange-700 mt-2 inline-block'>Don`t have a Account?</Link>
            </form>
         </div>
      </div>
   )
}

export default Login
