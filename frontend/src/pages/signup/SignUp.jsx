import React, { useState } from 'react'
import GenderSelect from './GenderSelect'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'

const SignUp = () => {
   const [userCredential, setUserCredential] = useState({
      fullName: '',
      username: '',
      password: '',
      gender: '',
      confirmPassword: ''
   })

   const {loading, signUp} = useSignUp()

   const handleCheckBox = (gender) => {
      setUserCredential({ ...userCredential, gender })
   }

   const handleSubmit = async(e) => {
      e.preventDefault()
      await signUp(userCredential)

   }
   return (
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
         <div className="w-full p-6 rouded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp<span className='text-orange-700'>'it</span></h1>
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="fullname" className='label p-3'><span className='text-base label-text'>Full Name</span></label>
                  <input type="text" value={userCredential.fullName} onChange={(e) => setUserCredential({ ...userCredential, fullName: e.target.value })} placeholder='Enter Fullname' className='w-full input input-bordered h-10' />
               </div>
               <div>
                  <label htmlFor="username" className='label p-3'><span className='text-base label-text'>UserName</span></label>
                  <input type="text" value={userCredential.username} onChange={(e) => setUserCredential({ ...userCredential, username: e.target.value })} placeholder='Enter Username' className='w-full input input-bordered h-10' />
               </div>

               <div>
                  <label htmlFor="password" className='label p-3'><span className='text-base label-text'>Password</span></label>
                  <input type="password" value={userCredential.password} onChange={(e) => setUserCredential({ ...userCredential, password: e.target.value })} placeholder='Enter password' className='w-full input input-bordered h-10' />
               </div>

               <div>
                  <label htmlFor="c_password" className='label p-3'><span className='text-base label-text'>Confirm Password</span></label>
                  <input type="password" value={userCredential.confirmPassword} onChange={(e) => setUserCredential({ ...userCredential, confirmPassword: e.target.value })} placeholder='Enter Confirm Password' className='w-full input input-bordered h-10' />
               </div>
               <GenderSelect onChecked={handleCheckBox} selected={userCredential.gender} />
               <div>
                  <button className="btn btn-block btn-sm mt-8">Sign Up</button>
               </div>
               <Link to={'/login'} className='text-sm hover:underline hover:text-orange-700 mt-2 inline-block'>Have an Account?</Link>
            </form>
         </div>
      </div>
   )
}

export default SignUp
