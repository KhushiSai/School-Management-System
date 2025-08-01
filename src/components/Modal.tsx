import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-slate-900/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className={`inline-block w-full ${sizeClasses[size]} p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-600/50 shadow-2xl rounded-2xl`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-600/50">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};