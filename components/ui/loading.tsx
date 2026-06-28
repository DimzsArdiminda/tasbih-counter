import React from 'react'

interface LoadingProps {
  isDark?: boolean;
}


export default function Loading({ isDark }: LoadingProps) {

  return (
    <div className={`flex justify-center items-center h-screen bg-transparent`}>
      <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
    </div>
  );
}
