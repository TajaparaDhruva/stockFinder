import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = forwardRef(({ label, icon: Icon, error, type = 'text', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-5 flex flex-col">
      {label && (
        <label className="text-[10px] font-black mb-1.5 uppercase tracking-widest text-subtext ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="relative flex items-center rounded-xl border border-borderCustom bg-surface focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300">
          {Icon && (
            <div className="pl-4 text-subtext group-focus-within:text-primary transition-colors">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className="w-full bg-transparent py-3.5 px-4 focus:outline-none text-[13px] font-medium text-textMain placeholder:text-subtext/60"
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 text-subtext hover:text-textMain transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-500/80 text-[9px] font-bold mt-1.5 uppercase tracking-tight ml-1">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
