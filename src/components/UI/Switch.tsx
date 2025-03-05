// // src/components/UI/Switch.tsx
// import * as React from "react";

// interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   checked: boolean;
//   onCheckedChange: (checked: boolean) => void;
//   className?: string;
// }

// export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
//   ({ checked, onCheckedChange, className = "", ...props }, ref) => {
//     return (
//       <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
//         <input
//           type="checkbox"
//           value=""
//           className="sr-only peer"
//           checked={checked}
//           onChange={(e) => onCheckedChange(e.target.checked)}
//           ref={ref}
//           {...props}
//         />
//         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//       </label>
//     );
//   }
// );

// src/components/UI/Switch.tsx
import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className = "", ...props }, ref) => {
    return (
      <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';