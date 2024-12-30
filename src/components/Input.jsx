import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div>
            {/* Always remember the label might not be given always  */}
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>{label}</label>
            }
            <input
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            type={type}
            ref = {ref}  //Reference being passed from the Form using the input Field (For the requried function on that field)
            id = {id}
            {...props}
             />
        </div>
    )
})



export default Input