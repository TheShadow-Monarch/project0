import React from 'react';
import { Shield, Target, Trophy, Search } from 'lucide-react';
import FloatingShields from './FloatingShields';

interface LayoutProps {
    children: React.ReactNode;
    activeModule: string;
    setActiveModule: (module: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, setActiveModule }) => {
    const navItems = [
        { id: 'nexus', label: 'THE NEXUS', icon: Shield },
        { id: 'operations', label: 'OPERATIONS HUB', icon: Target },
        { id: 'vanguard', label: 'THE VANGUARD', icon: Trophy },
        { id: 'analyzer', label: 'THREAT ANALYZER', icon: Search },
    ];

    return (
        <div className="relative min-h-screen bg-obsidian text-white font-sans overflow-hidden">
            {/* Global Overlays */}
            <FloatingShields />
            <div className="crt-overlay pointer-events-none"></div>
            <div className="scanline pointer-events-none"></div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-cyber-gray px-6 py-4 flex flex-col md:flex-row justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-3 mb-4 md:mb-0 cursor-pointer" onClick={() => setActiveModule('nexus')}>
                    <Shield className="w-8 h-8 text-neon-green animate-pulse-fast" />
                    <span className="font-mono text-xl font-bold tracking-widest text-glow">AEGIS-X</span>
                </div>

                <div className="flex gap-2 sm:gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeModule === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveModule(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 font-mono text-sm tracking-wider transition-all duration-300 rounded ${isActive
                                        ? 'bg-electric-cobalt/20 text-neon-green border border-neon-green/50 box-glow'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-neon-green' : ''}`} />
                                <span className="whitespace-nowrap">{item.label}</span>
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="pt-28 md:pt-24 min-h-screen flex flex-col relative z-10 p-6 md:p-12">
                {children}
            </main>
        </div>
    );
};

export default Layout;
