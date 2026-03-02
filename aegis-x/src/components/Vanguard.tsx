import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Terminal, Code, Cpu } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    rank: number;
    score: number;
    missions: number;
    badge: React.ElementType;
}

const initialAgents: Agent[] = [
    { id: 'AG-001', name: 'Cipher_Ghost', rank: 1, score: 15420, missions: 42, badge: Shield },
    { id: 'AG-042', name: 'Neon_Byte', rank: 2, score: 14890, missions: 38, badge: Zap },
    { id: 'AG-103', name: 'Zero_Day_X', rank: 3, score: 14200, missions: 35, badge: Terminal },
    { id: 'AG-088', name: 'Null_Pointer', rank: 4, score: 12500, missions: 29, badge: Code },
    { id: 'AG-211', name: 'Logic_Bomb', rank: 5, score: 11800, missions: 26, badge: Cpu },
    { id: 'AG-404', name: 'M4LWARE_KING', rank: 6, score: 10200, missions: 21, badge: Code },
    { id: 'AG-555', name: 'Packet_Sniffer', rank: 7, score: 9500, missions: 18, badge: Zap },
];

const Vanguard: React.FC = () => {
    const [agents, setAgents] = useState<Agent[]>(initialAgents);

    // Simulated rank up event
    useEffect(() => {
        const timer = setTimeout(() => {
            setAgents(prev => {
                const newAgents = [...prev];
                // Swap rank 2 and 3 for demonstration
                newAgents[2].score = newAgents[1].score + 100; // Rank 3 overtakes Rank 2

                // Re-sort
                newAgents.sort((a, b) => b.score - a.score);
                // Re-assign ranks
                newAgents.forEach((agent, idx) => agent.rank = idx + 1);
                return newAgents;
            });
        }, 5000); // 5 seconds after load
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight mb-4 text-white">
                    THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cobalt to-purple-600">VANGUARD</span>
                </h2>
                <p className="text-gray-400 font-mono tracking-widest max-w-2xl mx-auto text-sm md:text-base">
                    ELITE OPERATIVES RANKING. REAL-TIME THREAT MITIGATION SCORES.
                </p>
            </motion.div>

            <div className="w-full glass-panel overflow-hidden border border-cyber-gray rounded-xl">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left font-mono text-sm md:text-base whitespace-nowrap">
                        <thead className="bg-cyber-dark text-gray-400 border-b border-cyber-gray">
                            <tr>
                                <th className="py-4 px-6 tracking-widest">RANK</th>
                                <th className="py-4 px-6 tracking-widest">AGENT</th>
                                <th className="py-4 px-6 tracking-widest text-right">MITIGATION SCORE</th>
                                <th className="py-4 px-6 tracking-widest text-center">MISSIONS</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {agents.map((agent) => {
                                const isTop3 = agent.rank <= 3;
                                const Icon = agent.badge;

                                return (
                                    <motion.tr
                                        key={agent.id}
                                        layout="position"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            layout: { type: "spring" as const, stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className={`border-b border-white/5 transition-colors duration-300 hover:bg-white/5 ${isTop3 ? 'bg-obsidian/50' : ''
                                            }`}
                                    >
                                        <td className="py-4 px-6 font-bold">
                                            <div className={`flex items-center justify-center w-8 h-8 rounded ${agent.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 box-shadow-[0_0_10px_rgba(234,179,8,0.3)]' :
                                                agent.rank === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/50 shadow-[0_0_10px_rgba(209,213,219,0.3)]' :
                                                    agent.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/50 shadow-[0_0_10px_rgba(180,83,9,0.3)]' :
                                                        'text-gray-500'
                                                }`}>
                                                {agent.rank}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg bg-cyber-dark border ${isTop3 ? 'border-neon-green/50 text-neon-green glow-icon' : 'border-cyber-gray text-gray-500'
                                                    }`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className={`font-bold tracking-wider ${isTop3 ? 'text-white' : 'text-gray-300'}`}>
                                                        {agent.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{agent.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right font-bold text-electric-cobalt tracking-widest">
                                            {agent.score.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-400">
                                            {agent.missions}
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>{`
        .glow-icon {
          filter: drop-shadow(0 0 5px rgba(57, 255, 20, 0.5));
        }
      `}</style>
        </div>
    );
};

export default Vanguard;
