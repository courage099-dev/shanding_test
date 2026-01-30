import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = "",
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#BC5834] text-white hover:bg-[#a64d2d] focus:ring-[#BC5834]",
    secondary: "bg-[#E5E1D0] text-[#2c1810] hover:bg-[#d6d2c1] focus:ring-[#E5E1D0]",
    outline: "border-2 border-[#BC5834] text-[#BC5834] hover:bg-[#BC5834]/10 focus:ring-[#BC5834]"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};
