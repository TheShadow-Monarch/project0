import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, ChevronRight, Zap } from 'lucide-react';

type EventStatus = 'LIVE' | 'UPCOMING' | 'PAST';

interface AegisEvent {
    id: string;
    title: string;
    type: string;
    status: EventStatus;
    date: string;
    location: string;
    participants: number;
    description: string;
}

const mockEvents: AegisEvent[] = [
    {
        id: 'E-01',
        title: 'OPERATION SILENT DAWN',
        type: 'RED TEAM LENS',
        status: 'LIVE',
        date: 'NOW CACHE_ACTIVE',
        location: 'GLOBAL NETWORK',
        participants: 124,
        description: 'Intercept simulated ransomware payloads before they breach the core mainframe. Real-time threat analysis required.'
    },
    {
        id: 'E-02',
        title: 'DEPLOYATHON MADURAI',
        type: 'BUILD & DEPLOY',
        status: 'UPCOMING',
        date: 'MAR 2, 2026',
        location: 'SRM CAMPUS',
        participants: 450,
        description: 'The ultimate AI x Cybersecurity hackathon. Build the future of secure intelligence.'
    },
    {
        id: 'E-03',
        title: 'ZERO-DAY PROTOCOL',
        type: 'VULNERABILITY RESEARCH',
        status: 'UPCOMING',
        date: 'MAR 15, 2026',
        location: 'VIRTUAL',
        participants: 85,
        description: 'Hunt for unpatched vulnerabilities in legacy systems. High bounties available.'
    },
    {
        id: 'E-04',
        title: 'QUANTUM SHIELD',
        type: 'CRYPTOGRAPHY',
        status: 'PAST',
        date: 'FEB 10, 2026',
        location: 'TOKYO HUB',
        participants: 312,
        description: 'Implement post-quantum cryptographic algorithms to secure communications.'
    }
];

const OperationsHub: React.FC = () => {
    const [filter, setFilter] = useState<EventStatus | 'ALL'>('ALL');

    const filteredEvents = mockEvents.filter(e => filter === 'ALL' || e.status === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight mb-4 text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-400">OPERATIONS</span> HUB
                </h2>
                <p className="text-gray-400 font-mono tracking-widest max-w-2xl mx-auto text-sm md:text-base">
                    ACTIVE AND CLASSIFIED MISSIONS. SELECT YOUR OBJECTIVE.
                </p>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
                {['ALL', 'LIVE', 'UPCOMING', 'PAST'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as any)}
                        className={`px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 border ${filter === status
                            ? 'border-neon-green bg-neon-green/20 text-neon-green box-glow'
                            : 'border-cyber-gray bg-cyber-dark/50 text-gray-500 hover:text-gray-300 hover:border-gray-500'
                            }`}
                    >
                        [{status}]
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 w-full"
            >
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map(event => (
                        <motion.div
                            key={event.id}
                            layout="position"
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="glass-panel p-6 flex flex-col relative overflow-hidden group border-l-4"
                            style={{
                                borderLeftColor: event.status === 'LIVE' ? '#39FF14' :
                                    event.status === 'UPCOMING' ? '#0047AB' : '#4a5568'
                            }}
                        >
                            {/* Status Badge */}
                            <div className="absolute top-6 right-6 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                                {event.status === 'LIVE' && <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>}
                                <span className={
                                    event.status === 'LIVE' ? 'text-neon-green' :
                                        event.status === 'UPCOMING' ? 'text-electric-cobalt' : 'text-gray-500'
                                }>{event.status}</span>
                            </div>

                            <div className="font-mono text-xs text-gray-500 mb-2 truncate max-w-[70%]">{event.id} // {event.type}</div>
                            <h3 className="text-2xl font-black mb-4 group-hover:text-neon-green transition-colors">{event.title}</h3>

                            <div className="flex flex-col gap-2 mb-6 text-sm font-mono text-gray-400">
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-electric-cobalt" /> {event.date}</div>
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-electric-cobalt" /> {event.location}</div>
                                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-electric-cobalt" /> {event.participants} AGENTS ENROLLED</div>
                            </div>

                            <p className="text-gray-300 text-sm flex-grow mb-8 border-t border-white/5 pt-4">
                                {event.description}
                            </p>

                            <div className="mt-auto">
                                <button
                                    disabled={event.status === 'PAST'}
                                    className={`w-full py-3 flex items-center justify-center gap-2 font-mono font-bold tracking-widest transition-all duration-300 ${event.status === 'PAST'
                                        ? 'bg-cyber-dark text-gray-600 cursor-not-allowed border border-gray-800'
                                        : 'bg-electric-cobalt/10 border border-electric-cobalt text-electric-cobalt hover:bg-electric-cobalt/30 hover:shadow-[0_0_15px_rgba(0,71,171,0.5)]'
                                        }`}
                                >
                                    {event.status === 'PAST' ? 'MISSION ARCHIVED' : 'JOIN MISSION'}
                                    {event.status !== 'PAST' && <ChevronRight className="w-4 h-4" />}
                                    {event.status === 'LIVE' && <Zap className="w-4 h-4 text-neon-green animate-pulse" />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default OperationsHub;
