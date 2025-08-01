import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-slate-500/50 ${className}`}>
      {title && (
        <div className="px-8 py-6 border-b border-slate-600/50 bg-gradient-to-r from-slate-700/30 to-slate-800/30">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};