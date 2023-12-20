import React from 'react'

const TestClock = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='w-64 h-32 bg-primary rounded-xl p-4 flex justify-evenly'>
        <div className="font-poppins text-5xl text-white flex flex-col items-center">
          <div className='text-xl'>+</div>
          <div>1</div>
          <div className='text-xl'>-</div>
        </div>
        <div className="font-poppins text-5xl text-white flex flex-col items-center">
          <div className='text-xl'>+</div>
          <div>1</div>
          <div className='text-xl'>-</div>
        </div>
        <div className="font-poppins text-5xl text-white flex flex-col items-center">
          <div className='text-xl'>+</div>
          <div>1</div>
          <div className='text-xl'>-</div>
        </div>
        <div className="font-poppins text-5xl text-white flex flex-col items-center">
          <div className='text-xl'>+</div>
          <div>1</div>
          <div className='text-xl'>-</div>
        </div>
      </div>
    </div>
  )
}

export default TestClock