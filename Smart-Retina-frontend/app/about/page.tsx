"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// Added FaUserCircle for the team placeholder
import { FaMicroscope, FaCode, FaServer, FaHeartbeat, FaLinkedin, FaGithub, FaUserCircle } from "react-icons/fa";

// Removed 'img' property as it's no longer needed
const teamMembers = [
  { name: "Reda Mohamed", role: "Full Stack Developer",Linkedin: "", Github: "" },
  { name: "Mohamed Tamer", role: "AI Engineer" ,Linkedin: "", Github: "" },
  { name: "Marwan Ashraf", role: "AI Engineer"  ,Linkedin: "", Github: "" },
  { name: "Mariam Rahab", role: "Backend Developer", Linkedin: "", Github: ""  },
  {name: "Moamen Mohamed", role: "Flutter Developer" , Linkedin: "", Github: ""  },
  {name: "Abdallah Sayed", role: "Flutter Developer" , Linkedin: "", Github: ""  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-[#1e293b] dark:text-slate-200 transition-colors duration-300">
      <Navbar />

      {/* --- 1. Hero Section --- */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          Graduation Project 2026
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 text-[#152066] dark:text-blue-100 leading-tight">
          AI that sees what <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            the human eye might miss.
          </span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
          Smart Retina is an advanced diagnostic tool designed to assist ophthalmologists in detecting retinal diseases early, accurately, and instantly.
        </p>
      </section>

      {/* --- 2. The "Why" (Problem vs Solution) --- */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Visual */}
          <div className="relative h-[400px] bg-gradient-to-tr from-[#152066] to-[#2563eb] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <FaMicroscope className="text-9xl text-white/20 group-hover:scale-110 transition duration-500" />
             <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white border border-white/20">
                <p className="font-bold">94% Accuracy</p>
                <p className="text-xs text-blue-100">Achieved on validation datasets</p>
             </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div>
               <h2 className="text-3xl font-bold text-[#152066] dark:text-blue-100 mb-3">The Challenge</h2>
               <p className="text-gray-600 dark:text-gray-400">
                 Retinal diseases like Diabetic Retinopathy are the leading cause of blindness. However, diagnosis requires specialized doctors who are often overworked or unavailable in rural areas. Manual screening is slow and prone to human error.
               </p>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-slate-800"></div>
            <div>
               <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">Our Solution</h2>
               <p className="text-gray-600 dark:text-gray-400">
                 We trained a Convolutional Neural Network (CNN) on thousands of medical fundus images. Our web platform allows any doctor to upload a scan and get a diagnosis in seconds, acting as a reliable "second opinion" to prevent misdiagnosis.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Technology Stack (UPDATED FASTAPI) --- */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-gray-200 dark:border-slate-800 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-center text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-10">Powered by Modern Tech</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md dark:border dark:border-slate-800 transition">
                  <FaCode className="text-4xl text-blue-500 mx-auto mb-3" />
                  <h4 className="font-bold">Next.js 14</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Frontend Framework</p>
               </div>
               
               {/* UPDATED BACKEND */}
               <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md dark:border dark:border-slate-800 transition">
                  <FaServer className="text-4xl text-green-500 mx-auto mb-3" />
                  <h4 className="font-bold">FastAPI (Python)</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">High-Performance API</p>
               </div>

               <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md dark:border dark:border-slate-800 transition">
                  <FaMicroscope className="text-4xl text-orange-500 mx-auto mb-3" />
                  <h4 className="font-bold">TensorFlow</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Deep Learning Model</p>
               </div>
               <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md dark:border dark:border-slate-800 transition">
                  <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold">Medical Data</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Curated Datasets</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- 4. The Team Section (PHOTOS REMOVED) --- */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#152066] dark:text-blue-100 mb-4">Meet the Team</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Built with passion by the students of the Faculty of Computer Science.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group relative p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent dark:border-slate-800 transition duration-300">
                
                {/* Replaced Image with Icon Placeholder */}
                <FaUserCircle className="w-24 h-24 mx-auto text-blue-200 dark:text-slate-700 mb-4 group-hover:text-blue-300 dark:group-hover:text-blue-900/60 transition" />
                
                <h3 className="font-bold text-lg text-[#152066] dark:text-blue-100">{member.name}</h3>
                <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">{member.role}</p>
                
                {/* Social Icons */}
                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
                   <a href={member.Linkedin} className="text-gray-400 dark:text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition"><FaLinkedin size={20} /></a>
                   <a href={member.Github} className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition"><FaGithub size={20} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </main>
  );
};

export default AboutPage;