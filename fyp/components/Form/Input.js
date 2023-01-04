import React, { useState } from 'react'

const Inputs = ({ key, errorMessage, onChange, label, ...inputProps }) => {
    const [Focus, setFocus] = useState("false")
    const onFocus = (e) => {
        setFocus("true")
    }
    return (
        <div className='flex flex-col mx-4'>
            <label className="leading-7 text-sm text-left dark:text-gray-500 text-gray-400 font-semibold">{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={onFocus} focused={Focus}
                className='infoInputs bg-gray-800 rounded-md text-base outline-none text-gray-300 py-1 my-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
            <span className="errMsg hidden  text-red-500 text-sm text-left  ">{errorMessage}</span>
        </div>
    )
}

export default Inputs