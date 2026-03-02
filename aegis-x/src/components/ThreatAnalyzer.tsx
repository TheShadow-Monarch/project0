import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Cpu, Activity, Search } from 'lucide-react';

type ScanStatus = 'IDLE' | 'SCANNING' | 'SECURE' | 'MALICIOUS';

const ThreatAnalyzer: React.FC = () => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<ScanStatus>('IDLE');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setStatus('SCANNING');
        setProgress(0);
        setLogs(['INITIALIZING AI THREAT DETECTION PROTOCOL...', 'ESTABLISHING SECURE CONNECTION TO TARGET...', `RESOLVING HOST: ${url}`]);
    };

    useEffect(() => {
        if (status === 'SCANNING') {
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        // Simulate random result for demo purposes
                        const result = Math.random() > 0.4 ? 'SECURE' : 'MALICIOUS';
                        setStatus(result);
                        setLogs(prev => [...prev, `SCAN COMPLETE. VERDICT: ${result}`]);
                        return 100;
                    }
                    const increment = Math.floor(Math.random() * 15) + 5;
                    const newProgress = Math.min(p + increment, 100);

                    if (newProgress === 30) setLogs(prev => [...prev, 'DEEP PACKET INSPECTION IN PROGRESS...']);
                    if (newProgress === 60) setLogs(prev => [...prev, 'ANALYZING HEURISTICS FOR ZERO-DAY SIGNATURES...']);
                    if (newProgress === 90) setLogs(prev => [...prev, 'COMPILING FINAL THREAT REPORT...']);

                    return newProgress;
                });
            }, 500);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight mb-4 text-white flex justify-center items-center gap-4">
                    <Cpu className="w-10 h-10 text-neon-green" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-400">THREAT</span> ANALYZER
                </h2>
                <p className="text-gray-400 font-mono tracking-widest max-w-2xl mx-auto text-sm md:text-base">
                    AI-POWERED VULNERABILITY SCANNER. SUBMIT TARGET URL CONSTANTS.
                </p>
            </motion.div>

            <div className="w-full glass-panel p-8 rounded-xl border border-cyber-gray shadow-2xl relative overflow-hidden">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />

                <form onSubmit={handleScan} className="relative z-10 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="ENTER TARGET URL (e.g., https://suspicious-domain.com)"
                            className="w-full bg-cyber-dark/80 border border-cyber-gray text-white font-mono py-4 pl-12 pr-4 focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all placeholder:text-gray-600"
                            disabled={status === 'SCANNING'}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'SCANNING' || !url}
                        className="px-8 py-4 bg-neon-green text-obsidian font-mono font-bold tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        {status === 'SCANNING' ? (
                            <><Activity className="w-5 h-5 animate-spin" /> SCANNING...</>
                        ) : 'INITIATE SCAN'}
                    </button>
                </form>

                <AnimatePresence>
                    {status !== 'IDLE' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="relative z-10 flex flex-col gap-6"
                        >
                            {/* Progress Bar Container */}
                            <div className="w-full h-8 bg-cyber-dark border border-cyber-gray relative overflow-hidden flex items-center">
                                <motion.div
                                    className={`absolute top-0 left-0 h-full ${status === 'MALICIOUS' ? 'bg-red-600' : 'bg-neon-green'
                                        }`}
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.5 }}
                                />

                                {/* Scanline effect over progress bar */}
                                <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)] pointer-events-none"></div>

                                <span className="relative z-10 w-full text-center font-mono font-bold text-xs mix-blend-difference text-white tracking-widest">
                                    {progress}% // {status === 'SCANNING' ? 'ANALYSIS IN PROGRESS' : 'ANALYSIS COMPLETE'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Terminal Output */}
                                <div className="bg-[#0a0a0a] border border-cyber-gray p-4 font-mono text-xs text-neon-green h-48 overflow-y-auto flex flex-col justify-end">
                                    {logs.map((log, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            <span className="text-gray-500 mr-2">[{new Date().toISOString().substring(11, 19)}]</span>
                                            {log}
                                        </motion.div>
                                    ))}
                                    {status === 'SCANNING' && (
                                        <motion.div
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="w-2 h-4 bg-neon-green inline-block mt-1"
                                        />
                                    )}
                                </div>

                                {/* Verdict Box */}
                                <div className="flex-1 border border-cyber-gray p-6 flex flex-col items-center justify-center relative overflow-hidden bg-cyber-dark/50">
                                    {status === 'SCANNING' ? (
                                        <div className="text-center font-mono text-electric-cobalt h-full flex flex-col items-center justify-center">
                                            <Cpu className="w-16 h-16 animate-pulse mb-4" />
                                            <div className="tracking-widest">AWAITING HEURISTICS...</div>
                                        </div>
                                    ) : status === 'SECURE' ? (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center text-neon-green flex flex-col items-center justify-center w-full h-full"
                                        >
                                            <ShieldCheck className="w-20 h-20 mb-4 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
                                            <div className="font-black text-2xl tracking-widest">SYSTEM SECURE</div>
                                            <div className="font-mono text-sm mt-2 text-gray-400">NO THREATS DETECTED ON TARGET</div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center text-red-500 flex flex-col items-center justify-center w-full h-full"
                                        >
                                            <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
                                            <ShieldAlert className="w-20 h-20 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] relative z-10" />
                                            <div className="font-black text-2xl tracking-widest relative z-10">MALICIOUS PAYLOAD</div>
                                            <div className="font-mono text-sm mt-2 text-gray-400 relative z-10">CRITICAL VULNERABILITY FOUND</div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ThreatAnalyzer;
