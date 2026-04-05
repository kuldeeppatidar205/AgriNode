import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // If the modal isn't open, we render nothing
  if (!isOpen) return null;

  return createPortal(
    // 1. Overlay (The dark background)
    <div 
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // Closes when clicking the background
    >
      {/* 2. The Window (The actual info box) */}
      <div 
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // STOPS the window from closing when you click inside
      >
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xs font-bold"
        >
          ✕
        </button>

        {/* Content goes here */}
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>,
    document.body // Teleports the HTML to the end of the <body> tag
  );
};

export default Modal;