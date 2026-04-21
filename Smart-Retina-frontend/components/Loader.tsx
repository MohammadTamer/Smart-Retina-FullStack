import React from "react";

interface LoaderProps {
  fullScreen?: boolean; // If true, covers the whole screen
  text?: string;        // Optional text below the spinner
  size?: "sm" | "md" | "lg"; // Different sizes
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, text, size = "md" }) => {
  
  // Size classes mapping
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4 z-50">
      {/* Outer Ring */}
      <div className={`relative rounded-full animate-spin ${sizeClasses[size]} border-gray-200 border-t-[#152066] border-b-[#2563eb]`}>
         {/* Inner Ring (Spinning Reverse) */}
         <div className="absolute inset-0 rounded-full border-inherit border-t-transparent border-b-transparent animate-spin-reverse opacity-50"></div>
      </div>
      
      {/* Optional Text */}
      {text && (
        <p className="text-[#152066] font-medium text-sm animate-pulse tracking-wide">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default Loader;