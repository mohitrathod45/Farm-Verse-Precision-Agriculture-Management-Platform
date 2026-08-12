import React from 'react';
import { RiPlantLine } from 'react-icons/ri';

const PageHeader = ({ title, description, action }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 rounded-2xl p-6 sm:p-7 shadow-md border border-emerald-700/50 mb-8 flex flex-col sm:flex-row sm:items-center justify-between relative overflow-hidden text-white gap-4">
      {/* Soft Nature Glow & Leaf Watermark */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block text-emerald-200">
        <RiPlantLine className="text-[140px]" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
          {title}
        </h1>
        {description && (
          <p className="text-emerald-100/90 text-sm leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {action && (
        <div className="relative z-10 shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
