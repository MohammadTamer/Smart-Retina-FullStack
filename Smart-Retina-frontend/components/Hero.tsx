
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hero: React.FC = () => {


  return (
    <section className="relative  top-15 w-full min-h-[89vh] md:min-h-[92vh] bg-linear-to-b from-[#152066] via-[#2a46b5] to-[#95cbf8] overflow-hidden flex items-center">


      {/* ---  Background Waves (Sky to Sea Gradient) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block">

        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 700"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* UPDATED GRADIENT: "Sky to Sea"
            */}
            <linearGradient id="sky-to-sea" x1="0%" y1="0%" x2="0%" y2="100%">
              {/* Top: Sky Blue color */}
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              {/* Middle: Transitioning */}
              <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.3" />
              {/* Bottom: "Less Blue" / White / Sea Foam */}
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Wave 1: Large sweeping wave using the Sky-to-Sea gradient */}
          <path
            fill="url(#sky-to-sea)"
            d="M0,0 C240,120 480,200 720,150 C960,100 1200,20 1440,80 V900 H0 V0 Z"
            transform="translate(0, -50)"
          />

          {/* Wave 2: A secondary overlapping wave for depth */}
          <path
            fill="url(#sky-to-sea)"
            fillOpacity="0.5"
            d="M0,300 C300,200 600,400 900,300 C1200,200 1350,100 1440,150 V900 H0 V300 Z"
          />
        </svg>

        {/* Optional: Radial glow behind text area to make it pop against the waves */}
        <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] bg-blue-400/20 blur-[100px] rounded-full"></div>
      </div>


      {/* ---  Main Content --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-37.5 md:mt-0 md:pt-0">

        {/* Left: Text */}
        <div className="text-white space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight drop-shadow-lg">
            AI-Powered Retinal <br />
            <span className="text-blue-200">Disease Detection</span>
          </h1>
          <p className="text-base md:text-xl text-blue-50 font-light max-w-lg mx-auto md:mx-0 leading-relaxed opacity-90">
            Accurate and explainable diagnosis of retinal diseases using deep learning
          </p>
          <div className="pt-6">
            <Link href="/upload" className="px-8 py-3 md:px-10 md:py-4 hover:cursor-pointer bg-linear-to-b from-[#1976d2] to-[#0d47a1] text-white font-medium rounded shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t border-white/20">
              Upload Retinal Image
            </Link>
          </div>
        </div>

        {/* Right: The Eye Image (HIDDEN ON MOBILE) */}
        <div className="relative hidden md:flex justify-center md:justify-end mt-12 md:mt-0">

          {/* Glass Circle Container */}
          <div className="relative w-[380px] h-[380px] lg:w-[480px] lg:h-[465px] rounded-full p-4 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden shadow-inner relative ring-4 ring-white/10 backdrop-blur-sm">
              <div className="relative w-full h-full ..."> {/* Parent must have relative position */}
                <Image
                  src="/hero_image.png"
                  alt="Retina Scan"
                  fill // Replaces width={100} height={100}
                  quality={100}
                  className="object-cover" // Ensures it crops correctly
                  priority // Loads faster for Hero images
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Wave (Solid Color for transition) --- */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-20 hidden md:block">
        <svg
          className="relative block w-full h-[60px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
            fillOpacity="0.1"
          ></path>
          <path
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48L1200,53.3V120H1200V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z"
            className="fill-[#e3f2fd] dark:fill-slate-950 transition-colors duration-300"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;



























