import { FaBolt, FaCheckCircle, FaCogs } from "react-icons/fa";
import React from "react";

const Features: React.FC = () => {
  return (
    // Background color matches the Hero wave fill
    <section className="px-6 pt-28 pb-6 md:px-24 bg-[#e3f2fd] dark:bg-slate-950 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#152066] dark:text-blue-100 mb-12 font-sans">
        Why Choose Our AI?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white dark:border-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-b from-[#42a5f5] to-[#1976d2] rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition duration-300">
            <FaBolt />
          </div>
          <h3 className="text-xl font-bold text-[#152066] dark:text-blue-100 mb-3">Fast Diagnosis</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Quickly identify retinal diseases with AI-powered analysis
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white dark:border-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-b from-[#42a5f5] to-[#1976d2] rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition duration-300">
            <FaCheckCircle />
          </div>
          <h3 className="text-xl font-bold text-[#152066] dark:text-blue-100 mb-3">High Accuracy</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Achieve over 90% accuracy in diagnosing retinal conditions
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white dark:border-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-b from-[#42a5f5] to-[#1976d2] rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition duration-300">
            <FaCogs />
          </div>
          <h3 className="text-xl font-bold text-[#152066] dark:text-blue-100 mb-3">Explainable Results</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Understandable insights highlighting key areas of concern
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;