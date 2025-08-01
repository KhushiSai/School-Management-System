import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`block w-full rounded-xl border-slate-600/50 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
};