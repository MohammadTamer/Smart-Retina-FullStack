import Image from "next/image";
import React from "react";
import { diseasesData } from "../common";
import Link from "next/link";


const Diseases: React.FC = () => {
  return (
    <section className="px-6 py-16 md:px-12 bg-gradient-to-b from-[#e3f2fd] to-white dark:from-slate-950 dark:to-slate-950 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#152066] dark:text-blue-100 mb-12 font-sans">
        Supported Diseases
      </h2>

      {/* Responsive Grid: 1 col on mobile, 2 on tablet (sm), 4 on desktop (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xlg:grid-cols-5 gap-5 lg:gap-4  max-w-7xl mx-auto">

        {diseasesData.map((d, i) => (
          <Link href={d.slug} key={i} className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group ">
            <div className="h-54 overflow-hidden relative" >
              <Image fill
              src={d.img} 
              alt={d.title} 
              className="w-full h-full object-cover scale-95 rounded-2xl group-hover:scale-105 transition duration-700" />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition duration-300"></div>
            </div>
            <div className="p-6">
              <h4 className="text-[#152066] dark:text-blue-100 font-bold text-lg mb-2 leading-tight">{d.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{d.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Diseases;