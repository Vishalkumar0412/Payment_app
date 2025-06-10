import React from 'react'

const AvtarByName = ({name}) => {
    const char=name.charAt(0).toUpperCase()
  return (
    <div className='md:h-10 md:w-10 h-7 w-7 bg-gray-300 md:text-2xl text-md text-white flex md:p-3  p-1 justify-center items-center rounded-full'>
        {char}
    </div>
  )
}

export default AvtarByName
