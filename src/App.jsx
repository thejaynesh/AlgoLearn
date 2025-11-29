import React, { useState } from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import About from './components/About';

function App() {
  const [activeTab, setActiveTab] = useState('sorting');

  return (
    <div className="min-h-screen bg-ink-black-950 text-ink-black-50 font-sans selection:bg-icy-blue-500/30 selection:text-icy-blue-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-ink-black-950/90 border-b border-ink-black-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('about')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-icy-blue-500 to-smart-blue-600 flex items-center justify-center shadow-lg shadow-icy-blue-500/20">
              <span className="font-bold text-white text-lg">AL</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white hover:text-icy-blue-300 transition-colors">AlgoLearn</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-ink-black-900/50 p-1 rounded-xl border border-ink-black-800/50">
            {['sorting', 'pathfinding', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${activeTab === tab
                    ? 'bg-ink-black-800 text-white shadow-sm'
                    : 'text-ink-black-400 hover:text-ink-black-200 hover:bg-ink-black-800/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        {activeTab === 'sorting' && <SortingVisualizer />}
        {activeTab === 'pathfinding' && <PathfindingVisualizer />}
        {activeTab === 'about' && <About />}
      </main>
    </div>
  );
}

export default App;
