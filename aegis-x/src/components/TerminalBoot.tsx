import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootSequence = [
    "INITIALIZING AEGIS-X KERNEL...",
    "LOADING PSYCHOLOGICAL UX PROTOCOLS...",
    "BYPASSING SECURITY FIREWALLS [SUCCESS]",
    "ESTABLISHING DEEP NEURAL LINK...",
    "SCANNING FOR INTRUSIONS... [0 FOUND]",
    "ACCESS GRANTED.",
    "WELCOME TO THE NEXUS."
];

interface TerminalBootProps {
    onComplete: () => void;
}

const TerminalBoot: React.FC<TerminalBootProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < bootSequence.length) {
            const timer = setTimeout(() => {
                setLines(prev => [...prev, bootSequence[currentIndex]]);
                setCurrentIndex(prev => prev + 1);
            }, Math.random() * 400 + 200); // Random delay for realistic terminal feel
            return () => clearTimeout(timer);
        } else {
            const completeTimer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(completeTimer);
        }
    }, [currentIndex, onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-obsidian flex flex-col items-start justify-end p-8 font-mono text-neon-green text-sm sm:text-base md:text-lg lg:text-xl">
            <div className="w-full max-w-3xl mb-12">
                {lines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2"
                    >
                        <span className="text-electric-cobalt mr-4">{`>`}</span>
                        {line}
                    </motion.div>
                ))}
                {currentIndex < bootSequence.length && (
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-3 h-5 bg-neon-green inline-block ml-2 align-middle"
                    />
                )}
            </div>
        </div>
    );
};

export default TerminalBoot;
