import React from 'react'

const GenderSelect = ({ onChecked, selected }) => {
   return (
      <div className='flex'>
         <div className="form-control">
            <label className="label gap-2 mt-3 cursor-pinter">
               <span className="label-text">Male</span>
               <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={selected === "male"}
                  onChange={(e) => onChecked("male")}
               />
            </label>
         </div>
         <div className="form-control">
            <label className="label gap-2 mt-3 cursor-pinter">
               <span className="label-text">Female</span>
               <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={selected === "female"}
                  onChange={(e) => onChecked("female")}
               />
            </label>
         </div>
      </div>
   )
}

export default GenderSelect
