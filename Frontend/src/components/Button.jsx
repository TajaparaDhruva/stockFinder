import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, disabled, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: -2 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={`
        relative w-full py-4.5 px-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em]
        overflow-hidden group focus:outline-none transition-all duration-300
        ${disabled || isLoading 
          ? 'opacity-40 cursor-not-allowed bg-borderCustom text-gray-500' 
          : 'bg-primary text-white shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:shadow-primary/50 hover:bg-primary/90'}
      `}
      {...props}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary via-indigo-400 to-primary" />
      
      <div className="relative flex items-center justify-center gap-3 z-10">
        {isLoading ? (
          <Loader2 className="animate-spin text-white" size={18} />
        ) : (
          <>
            {children}
            <div className="w-1 h-1 rounded-full bg-accent" />
          </>
        )}
      </div>
    </motion.button>
  );
};

export default Button;
