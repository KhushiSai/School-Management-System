import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        className={`block w-full rounded-md border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};