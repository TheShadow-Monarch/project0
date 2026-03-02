import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Database, ShieldAlert, FastForward, Shield } from 'lucide-react';

interface NexusProps {
    setActiveModule: (module: string) => void;
}

const Nexus: React.FC<NexusProps> = ({ setActiveModule }) => {
    const threatLevels = [
        { city: 'TOKYO', level: 'CRITICAL', icon: AlertTriangle, color: 'text-red-500' },
        { city: 'LONDON', level: 'ELEVATED', icon: Activity, color: 'text-yellow-400' },
        { city: 'NEW YORK', level: 'SECURE', icon: ShieldAlert, color: 'text-neon-green' },
        { city: 'SINGAPORE', level: 'ELEVATED', icon: Activity, color: 'text-yellow-400' },
        { city: 'FRANKFURT', level: 'CRITICAL', icon: AlertTriangle, color: 'text-red-500' },
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] relative">
            {/* video background simulating a running terminal */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <video autoPlay loop muted className="w-full h-full object-cover opacity-10">
                    <source src="/terminal-loop.mp4" type="video/mp4" />
                    {/* add a terminal-loop.mp4 video file to the public folder */}
                </video>
            </div>

            {/* grid/particle overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #39FF14 1px, transparent 1px), radial-gradient(circle at center, #0047AB 1px, transparent 1px)',
                    backgroundSize: '40px 40px, 60px 60px',
                    backgroundPosition: '0 0, 20px 20px'
                }}
            />

            {/* floating shields decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <Shield
                        key={i}
                        className="absolute w-10 h-10 text-neon-green/20 animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${6 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glitch Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 text-center mb-6 px-4"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter cursor-default">
                    <span className="text-white text-glow inline-block hover:animate-glitch transition-all">SECURE </span>
                    <span className="text-gray-400 italic font-light inline-block mx-2">the</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cobalt to-purple-600 text-glow-cobalt inline-block hover:animate-glitch transition-all delay-75">FUTURE.</span>
                </h1>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-widest mt-2 cursor-default">
                    <span className="text-neon-green text-glow inline-block hover:animate-glitch transition-all delay-150">CODE </span>
                    <span className="text-gray-400 italic font-light inline-block mx-2">the</span>
                    <span className="text-white text-glow inline-block hover:animate-glitch transition-all delay-200">INTELLIGENCE.</span>
                </h2>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="z-10 flex flex-col sm:flex-row gap-6 mt-12 mb-20"
            >
                <button
                    onClick={() => setActiveModule('operations')}
                    className="group relative px-8 py-4 bg-neon-green/10 border border-neon-green text-neon-green font-mono font-bold tracking-widest text-lg overflow-hidden transition-all duration-300 hover:bg-neon-green hover:text-obsidian box-glow"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        JOIN A MISSION <FastForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 ease-out group-hover:scale-150 group-hover:bg-neon-green z-0"></div>
                </button>

                <button
                    onClick={() => setActiveModule('analyzer')}
                    className="px-8 py-4 bg-transparent border border-gray-600 text-gray-300 font-mono font-bold tracking-widest text-lg hover:border-electric-cobalt hover:text-electric-cobalt hover:bg-electric-cobalt/10 transition-all duration-300"
                >
                    RUN DIAGNOSTICS
                </button>
            </motion.div>

            {/* Live Threat Ticker */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-0 left-0 right-0 z-10 glass-panel border-t border-b-0 border-x-0 border-cyber-gray py-3 overflow-hidden flex"
            >
                <div className="bg-neon-green text-obsidian font-bold px-4 py-1 z-20 shrink-0 flex items-center gap-2">
                    <Database className="w-4 h-4 animate-pulse" /> LIVE INTEL
                </div>
                <div className="flex-1 overflow-hidden relative flex items-center">
                    <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap whitespace-before-space">
                        {[...threatLevels, ...threatLevels].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="flex items-center gap-2 mx-8 font-mono text-sm tracking-wider">
                                    <span className="text-gray-400">{item.city}</span>
                                    <span className="text-cyber-gray mx-1">|</span>
                                    <Icon className={`w-4 h-4 ${item.color}`} />
                                    <span className={`${item.color} font-bold`}>{item.level}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
};

export default Nexus;
