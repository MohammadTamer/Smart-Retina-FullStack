'use client'

import { FaEye, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
const Navbar: React.FC = () => {

    // State to handle the mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth() as any;
    // console.log(user)
    // Function to toggle state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-[#19246c] dark:bg-slate-950 text-white">
            <div className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-32 md:py-6 relative">

                {/* --- Logo --- */}
                <div className="flex items-center text-xl md:text-2xl font-bold tracking-wide drop-shadow-md z-50">
                    <FaEye className="mr-2 md:mr-3 text-2xl md:text-3xl" />
                    <Link href="/">Smart Retina</Link>
                </div>

                {/* --- Desktop Menu (Hidden on Small Screens) --- */}
                <div className="hidden md:flex items-center justify-around space-x-8">
                    {[
                        { title: "Home", href: "/" },
                        ...(user ? [{ title: "Dashboard", href: user.role === 'doctor' ? '/admin/dashboard' : '/dashboard' }] : []),
                        { title: "Upload", href: '/upload' },
                        { title: "Diseases", href: '/diseases' },
                        { title: "About", href: '/about' }
                    ].map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="text-blue-50 hover:text-white transition font-medium text-sm tracking-wide drop-shadow-sm hover:underline underline-offset-4"
                        >
                            {item.title}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-5 border-l border-white/10 pl-6">
                            <Link href="/profile" className="flex items-center gap-2 hover:text-blue-200 transition group">
                                <div className="w-9 h-9 bg-[#0d47a1] rounded-full flex items-center justify-center font-bold text-sm border border-white/20 group-hover:bg-blue-600">
                                    {user.full_name?.charAt(0)}
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-xs font-bold leading-tight">{user.full_name?.split(' ')[0]}</p>
                                    <p className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter">{user.role}</p>
                                </div>
                            </Link>
                        </div>

                    ) : (

                        <Link href="/login"
                            className="px-5 py-2 bg-[#0d47a1] bg-opacity-80 border border-white/20 rounded-md hover:bg-[#1565c0] transition shadow-lg text-sm backdrop-blur-sm">
                            Login
                        </Link>
                    )}
                </div>


                {/* --- Mobile Menu Button (Hamburger) --- */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-2xl text-blue-100 hover:text-white focus:outline-none z-50"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* --- Mobile Menu Dropdown (Visible only when isOpen is true) --- */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-[#152066]/95 dark:bg-slate-950/95 backdrop-blur-lg shadow-2xl transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
                    }`}
            >
                <div className="flex flex-col items-center py-8 space-y-6">
                    {[
                        { title: "Home", href: "/" },
                        ...(user ? [{ title: "Dashboard", href: user.role === 'doctor' ? '/admin/dashboard' : '/dashboard' }] : []),
                        { title: "Upload", href: '/upload' },
                        { title: "Diseases", href: '/diseases' },
                        { title: "About", href: '/about' }
                    ].map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setIsOpen(false)} // Close menu when a link is clicked
                            className="text-lg font-medium text-blue-100 hover:text-white hover:bg-white/10 w-full text-center py-3 transition duration-200"
                        >
                            {item.title}
                        </Link>
                    ))}
                    {
                        user ? (
                            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-100 hover:text-white py-2">
                                My Profile
                            </Link>
                        ) : (

                            <Link href="/login"
                                className="px-5 py-2 bg-[#0d47a1] bg-opacity-80 border border-white/20 rounded-md hover:bg-[#1565c0] transition shadow-lg text-sm backdrop-blur-sm">
                                Login
                            </Link>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;