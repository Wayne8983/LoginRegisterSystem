import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-300 flex flex-col items-center justify-center' >
      <div className='h-120 w-120 items-center justify-center bg-transparent rounded-2xl shadow-lg ' >
        <h2 className='text-center font-black font-bold'>Welcome </h2>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Home;
