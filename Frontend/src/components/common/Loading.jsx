import React from 'react'

const Loading = () => {
  return (
    <div className="flex  justify-center min-h-screen items-center relative bottom-40">
      <div className="w-16 h-16 border-4 border-t-4 border-t-black border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading;
