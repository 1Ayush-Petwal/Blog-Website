import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className=''
            ></label>}
            <select {...props} id={id} ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* Note that the options passed might be an empty array so, to prevent the crashing of the website we will Conditionally map the array array?.  */}
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}


//Remember that the forwardRef is used to pass the reference from the actual page to here 
export default React.forwardRef(Select)