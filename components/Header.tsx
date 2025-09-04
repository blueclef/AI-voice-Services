
import React from 'react';
import { BrainCircuitIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BrainCircuitIcon className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold text-slate-100 tracking-tight">
              AI Voice Studio
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">API Docs</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Logout</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
