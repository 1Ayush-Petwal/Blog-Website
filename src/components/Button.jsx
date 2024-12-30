import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-gray-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    // The JavaScript in the HTML is surrounded by the curly braces 
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button