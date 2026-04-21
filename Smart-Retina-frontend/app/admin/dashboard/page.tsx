"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import axios from "axios";
import { FaUserMd, FaUsers, FaClipboardList, FaSearch, FaCheckCircle, FaExclamationCircle, FaTimes, FaArrowLeft, FaArrowRight, FaEye, FaSpinner } from "react-icons/fa";

const AdminDashboard = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [reviewForm, setReviewForm] = useState({ finalDiagnosis: "", riskLevel: "", notes: "" });
    const [isViewMode, setIsViewMode] = useState(false);

    const itemsPerPage = 5;

    // Fetch Pending Scans from Backend
    useEffect(() => {
        const fetchPending = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) { setLoading(false); return; }
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/scans/doctor/pending`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(res.data);
            } catch (err: any) {
                console.error("Failed to load pending scans:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPending();
    }, []);

    const filteredData = patients.filter((item) =>
        (item.patient_name || `Patient #${item.patient_id}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ai_diagnosis || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

    const handleOpenModal = (scan: any) => {
        setSelectedPatient(scan);
        const isVerified = scan.status === "Verified";
        setIsViewMode(isVerified);
        setReviewForm({
            finalDiagnosis: scan.final_diagnosis || scan.ai_diagnosis || "",
            riskLevel: scan.risk_level || "Normal",
            notes: scan.doctor_notes || ""
        });
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isViewMode) return;

        const token = localStorage.getItem("access_token");
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/scans/doctor/${selectedPatient.id}/verify`, {
                final_diagnosis: reviewForm.finalDiagnosis,
                risk_level: reviewForm.riskLevel,
                status: "Verified",
                doctor_notes: reviewForm.notes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatients(prev => prev.filter(p => p.id !== selectedPatient.id));
            setSelectedPatient(null);
        } catch (err: any) {
            alert(err.response?.data?.detail || "Failed to verify scan");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-[#1e293b] dark:text-slate-200 relative transition-colors duration-300">
            <Navbar />

            <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">

                <div className="flex items-center gap-3 text-[#152066] dark:text-blue-300 mb-8">
                    <FaUserMd className="text-3xl" />
                    <div>
                        <h1 className="text-3xl font-bold">Doctor Portal</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Review pending AI diagnoses and manage patient records.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300 flex items-center justify-between">
                        <div><p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Pending Cases</p><p className="text-3xl font-bold text-[#152066] dark:text-blue-300">{patients.length}</p></div>
                        <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-xl border dark:border-yellow-800/50"><FaClipboardList /></div>
                    </div>
                    <div className="bg-gradient-to-br from-[#152066] to-[#2563eb] text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                        <div><p className="text-blue-100 text-xs font-bold uppercase">System Status</p><p className="text-xl font-bold">AI Online</p></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="text-lg font-bold text-[#152066] dark:text-blue-300">Patient Queue</h3>
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input type="text" placeholder="Search patient..." value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-slate-200 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-slate-800/30 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                    <th className="p-5">Scan ID</th>
                                    <th className="p-5">Patient</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5">AI Diagnosis</th>
                                    <th className="p-5">Risk</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
                                {loading ? (
                                    <tr><td colSpan={7} className="p-10 text-center text-gray-500 dark:text-gray-400"><FaSpinner className="animate-spin inline mr-2" /> Loading scans...</td></tr>
                                ) : currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition duration-150">
                                            <td className="p-5 font-medium text-[#152066] dark:text-blue-300">#SR-{item.id}</td>
                                            <td className="p-5 font-bold text-gray-700 dark:text-slate-300">{item.patient_name || `Patient #${item.patient_id}`}</td>
                                            <td className="p-5 text-gray-500 dark:text-gray-400">{new Date(item.upload_date).toLocaleDateString()}</td>
                                            <td className="p-5 text-gray-700 dark:text-slate-300">{item.ai_diagnosis}<br /><span className="text-xs text-gray-400 dark:text-gray-500">Confidence: {item.ai_confidence ? `${(item.ai_confidence * 100).toFixed(1)}%` : "N/A"}</span></td>
                                            <td className="p-5">
                                                <span className={`px-2 py-1 rounded text-xs font-bold border 
                                                ${item.risk_level === 'High Risk' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                                        item.risk_level === 'Moderate' ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800' :
                                                            'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'}`}>
                                                    {item.risk_level || "Unknown"}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold border border-yellow-200 dark:border-yellow-800/50"><FaExclamationCircle /> Pending</span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button onClick={() => handleOpenModal(item)} className="bg-[#152066] dark:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-[#1e2b85] dark:hover:bg-blue-700 transition">Review Case</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={7} className="p-8 text-center text-gray-400 dark:text-gray-500">No pending cases. All caught up! 🎉</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredData.length > itemsPerPage && (
                        <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/10">
                            <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}</span>
                            <div className="flex gap-2 items-center">
                                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"><FaArrowLeft /> Prev</button>
                                <span className="px-2 font-medium">Page {currentPage} of {totalPages}</span>
                                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">Next <FaArrowRight /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            {/* --- REVIEW MODAL --- */}
            {selectedPatient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-fadeIn flex flex-col md:flex-row h-[85vh] md:h-[600px] transition-colors duration-300">

                        <div className="w-full md:w-1/2 bg-black flex flex-col items-center justify-center relative p-4">
                            <div className="relative w-full h-full">
                                <Image src={selectedPatient.image_url?.startsWith('http') ? selectedPatient.image_url : `http://localhost:8000${selectedPatient.image_url}`} alt="Retinal Scan" fill className="object-contain" unoptimized />
                            </div>
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
                                Scan ID: #SR-{selectedPatient.id}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col bg-white dark:bg-slate-900">
                            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-[#152066] dark:text-blue-100">{isViewMode ? "Diagnosis Report (Read Only)" : "Diagnosis Verification"}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Patient: <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedPatient.patient_name || `Patient #${selectedPatient.patient_id}`}</span></p>
                                </div>
                                <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"><FaTimes size={24} /></button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 space-y-6">
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/40 p-4 rounded-xl">
                                    <p className="text-xs font-bold text-blue-400 dark:text-blue-500 uppercase tracking-wider mb-2">AI Analysis Report</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-[#152066] dark:text-blue-100">{selectedPatient.ai_diagnosis}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Based on CNN feature extraction</p>
                                        </div>
                                        <div className="text-center bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
                                            <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedPatient.ai_confidence ? `${(selectedPatient.ai_confidence * 100).toFixed(1)}%` : "N/A"}</span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">Confidence</span>
                                        </div>
                                    </div>
                                </div>

                                <form id="reviewForm" onSubmit={handleSubmitReview} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{isViewMode ? "Final Verified Diagnosis" : "Doctor's Final Diagnosis"}</label>
                                        <select disabled={isViewMode}
                                            className={`w-full p-3 border rounded-lg outline-none transition ${isViewMode ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-[#152066] dark:focus:ring-blue-500 dark:text-slate-200'}`}
                                            value={reviewForm.finalDiagnosis}
                                            onChange={(e) => setReviewForm({ ...reviewForm, finalDiagnosis: e.target.value })}>
                                            <option value="Healthy">Healthy (No Disease)</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Diabetic Retinopathy (DR)">Diabetic Retinopathy (DR)</option>
                                            <option value="Age-Related Macular Degeneration (AMD)">Age-Related Macular Degeneration (AMD)</option>
                                            <option value="Retinal Vein Occlusion (RVO)">Retinal Vein Occlusion (RVO)</option>
                                            <option value="Retinal Detachment (RD)">Retinal Detachment (RD)</option>
                                            <option value="Retinitis Pigmentosa (RP)">Retinitis Pigmentosa (RP)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Risk Assessment</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Normal', 'Moderate', 'High Risk'].map((risk) => (
                                                <button key={risk} type="button" disabled={isViewMode}
                                                    onClick={() => setReviewForm({ ...reviewForm, riskLevel: risk })}
                                                    className={`py-2 text-sm rounded-lg border transition 
                                                        ${reviewForm.riskLevel === risk
                                                            ? risk === 'High Risk' ? 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-500/50 text-red-600 dark:text-red-400 font-bold'
                                                                : risk === 'Moderate' ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-500 dark:border-orange-500/50 text-orange-600 dark:text-orange-400 font-bold'
                                                                    : 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-500/50 text-green-600 dark:text-green-400 font-bold'
                                                            : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}
                                                        ${isViewMode ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                                    {risk}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Clinical Notes</label>
                                        <textarea disabled={isViewMode} value={reviewForm.notes}
                                            onChange={(e) => setReviewForm({ ...reviewForm, notes: e.target.value })}
                                            rows={3} placeholder="Enter clinical findings and recommendations..."
                                            className={`w-full p-3 border rounded-lg outline-none transition resize-none
                                                ${isViewMode ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#152066] dark:focus:ring-blue-500'}`}
                                        />
                                    </div>

                                </form>
                            </div>

                            <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 flex gap-3">
                                <button onClick={() => setSelectedPatient(null)} className="w-full py-3 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-600 dark:text-gray-300 font-bold hover:bg-white dark:hover:bg-slate-800 transition">
                                    {isViewMode ? "Close Report" : "Cancel"}
                                </button>
                                {!isViewMode && (
                                    <button type="submit" form="reviewForm" className="w-full py-3 bg-[#152066] dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-[#1e2b85] dark:hover:bg-blue-700 shadow-lg transition flex justify-center items-center gap-2">
                                        <FaCheckCircle /> Verify & Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default AdminDashboard;
