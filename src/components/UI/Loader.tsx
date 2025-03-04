import React from 'react';

function Loader({ size = 'large', color = 'white' }: { size?: 'small' | 'medium' | 'large', color?: 'primary' | 'secondary' | 'white' }) {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-gray-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/40 backdrop-blur-md z-50 ">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          rounded-full 
          animate-spin
          border-solid
        `}
        role="status"
        aria-label="Loading"
      >
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
}

export default Loader;