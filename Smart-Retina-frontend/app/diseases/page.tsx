

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { diseasesData } from "@/common";

const DiseasesPage = () => {
  return (
    <main className="min-h-screen font-sans bg-[#f8fafc] dark:bg-slate-950 text-[#1e293b] dark:text-slate-200 transition-colors duration-300">
      <Navbar />

      {/* --- Header Section --- */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-20 text-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 px-4 transition-colors duration-300">
        <h1 className="text-3xl md:text-5xl font-bold text-[#152066] dark:text-blue-100 mb-4 md:mb-6">
          Retinal Diseases We Detect
        </h1>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-blue-800/70 dark:text-blue-300/70 leading-relaxed">
          Advanced AI-driven analysis for early detection and accurate understanding
          of critical retinal conditions.
        </p>
      </section>

      {/* --- Diseases Cards Section --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 space-y-8 md:space-y-12">
        {diseasesData.map((disease, index) => {
          
          // Logic: Is this an "Odd" item (1, 3, 5)?
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-14 items-center bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem]
                  shadow-lg md:shadow-[0_20px_60px_rgba(21,32,102,0.12)] dark:shadow-none
                  border border-transparent dark:border-slate-800
                  p-6 md:p-10
                  hover:shadow-xl md:hover:shadow-[0_30px_80px_rgba(21,32,102,0.2)]
                  transition-all duration-500"
            >
              
              {/* --- IMAGE CONTAINER --- 
                  Mobile: Always Order 1 (Top)
                  Desktop: Order 1 if normal, Order 2 if reversed (Right side)
              */}
              <div 
                className={`relative w-full h-52 md:h-[350px] rounded-2xl overflow-hidden order-1 ${isReversed ? 'md:order-2' : 'md:order-1'}`}
              >
                <Image
                  src={disease.img}
                  alt={disease.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* --- TEXT CONTENT --- 
                  Mobile: Always Order 2 (Bottom)
                  Desktop: Order 2 if normal, Order 1 if reversed (Left side)
              */}
              <div className={`space-y-4 md:space-y-6 order-2 ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#152066] dark:text-blue-100">
                  {disease.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed">
                  {disease.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs md:text-sm font-medium border border-transparent dark:border-blue-900/50">
                    AI Detection
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs md:text-sm font-medium border border-transparent dark:border-green-900/50">
                    Early Diagnosis
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs md:text-sm font-medium border border-transparent dark:border-purple-900/50">
                    Vision Risk
                  </span>
                </div>

                <Link
                  href={`${disease.slug}`}
                  className="inline-block mt-2 w-full md:w-auto text-center px-6 py-3 rounded-xl
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white font-semibold shadow-md
                  active:scale-95 md:hover:scale-105 transition-transform"
                >
                  Learn More
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
};

export default DiseasesPage;