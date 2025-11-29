import React, { useState, useEffect, useRef } from 'react';
import { dijkstraSteps } from '../algorithms/pathfinding';

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [startNode, setStartNode] = useState([5, 5]);
    const [endNode, setEndNode] = useState([15, 35]);
    const [visitedNodes, setVisitedNodes] = useState(new Set());
    const [pathNodes, setPathNodes] = useState(new Set());
    const animationRef = useRef(null);

    const ROWS = 20;
    const COLS = 40;

    useEffect(() => {
        resetGrid();
        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, []);

    const resetGrid = () => {
        const newGrid = [];
        for (let r = 0; r < ROWS; r++) {
            const row = [];
            for (let c = 0; c < COLS; c++) {
                row.push(0); // 0: empty, 1: wall
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
        setVisitedNodes(new Set());
        setPathNodes(new Set());
        setIsRunning(false);
        if (animationRef.current) clearInterval(animationRef.current);
    };

    const toggleWall = (r, c) => {
        if (isRunning) return;
        if ((r === startNode[0] && c === startNode[1]) || (r === endNode[0] && c === endNode[1])) return;

        const newGrid = [...grid];
        newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1;
        setGrid(newGrid);
    };

    const handleRun = () => {
        if (isRunning) return;
        setIsRunning(true);
        setVisitedNodes(new Set());
        setPathNodes(new Set());

        try {
            const steps = dijkstraSteps(grid, startNode, endNode);
            animate(steps);
        } catch (error) {
            console.error("Error:", error);
            setIsRunning(false);
        }
    };

    const animate = (steps) => {
        let i = 0;
        if (animationRef.current) clearInterval(animationRef.current);

        animationRef.current = setInterval(() => {
            if (i >= steps.length) {
                clearInterval(animationRef.current);
                setIsRunning(false);
                return;
            }

            const step = steps[i];
            if (step.type === 'visit') {
                setVisitedNodes(prev => {
                    const newSet = new Set(prev);
                    newSet.add(`${step.node[0]},${step.node[1]}`);
                    return newSet;
                });
            } else if (step.type === 'path') {
                const pathSet = new Set();
                step.nodes.forEach(node => pathSet.add(`${node[0]},${node[1]}`));
                setPathNodes(pathSet);
            }

            i++;
        }, 10);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-4">
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pacific-cyan-400 to-icy-blue-500 drop-shadow-sm">
                    Pathfinding Visualizer
                </h2>
                <p className="text-ink-black-400 text-lg max-w-2xl mx-auto">
                    Draw walls on the grid and visualize Dijkstra's algorithm finding the shortest path between nodes.
                </p>
            </div>

            {/* Controls Card */}
            <div className="bg-ink-black-900/40 backdrop-blur-md rounded-3xl p-8 border border-ink-black-800/50 shadow-glass">
                <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-3 bg-ink-black-800/50 px-4 py-2 rounded-xl border border-ink-black-700/50">
                            <div className="w-5 h-5 bg-pacific-cyan-500 rounded shadow-lg shadow-pacific-cyan-500/40"></div>
                            <span className="text-ink-black-200 font-medium">Start</span>
                        </div>
                        <div className="flex items-center gap-3 bg-ink-black-800/50 px-4 py-2 rounded-xl border border-ink-black-700/50">
                            <div className="w-5 h-5 bg-burnt-rose-500 rounded shadow-lg shadow-burnt-rose-500/40"></div>
                            <span className="text-ink-black-200 font-medium">End</span>
                        </div>
                        <div className="flex items-center gap-3 bg-ink-black-800/50 px-4 py-2 rounded-xl border border-ink-black-700/50">
                            <div className="w-5 h-5 bg-ink-black-600 rounded"></div>
                            <span className="text-ink-black-200 font-medium">Wall</span>
                        </div>
                        <div className="flex items-center gap-3 bg-ink-black-800/50 px-4 py-2 rounded-xl border border-ink-black-700/50">
                            <div className="w-5 h-5 bg-smart-blue-500/50 rounded shadow-lg shadow-smart-blue-500/20"></div>
                            <span className="text-ink-black-200 font-medium">Visited</span>
                        </div>
                        <div className="flex items-center gap-3 bg-ink-black-800/50 px-4 py-2 rounded-xl border border-ink-black-700/50">
                            <div className="w-5 h-5 bg-icy-blue-400 rounded shadow-lg shadow-icy-blue-400/40"></div>
                            <span className="text-ink-black-200 font-medium">Path</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={resetGrid}
                            disabled={isRunning}
                            className="px-6 py-3 bg-ink-black-800 hover:bg-ink-black-700 text-ink-black-200 rounded-xl transition-all duration-300 font-semibold border border-ink-black-700 hover:border-ink-black-600 shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            Reset Grid
                        </button>
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="px-8 py-3 bg-gradient-to-r from-pacific-cyan-600 to-icy-blue-600 hover:from-pacific-cyan-500 hover:to-icy-blue-500 text-white rounded-xl transition-all duration-300 font-bold shadow-neon-blue active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                        >
                            {isRunning ? 'Running...' : 'Run Dijkstra'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Container */}
            <div className="relative p-1 bg-ink-black-800/30 rounded-2xl border border-ink-black-800 shadow-2xl overflow-hidden mx-auto">
                <div
                    className="grid gap-[1px]"
                    style={{ gridTemplateColumns: `repeat(${COLS}, 26px)` }}
                >
                    {grid.map((row, r) => (
                        row.map((cell, c) => {
                            const isStart = r === startNode[0] && c === startNode[1];
                            const isEnd = r === endNode[0] && c === endNode[1];
                            const isWall = cell === 1;
                            const isVisited = visitedNodes.has(`${r},${c}`);
                            const isPath = pathNodes.has(`${r},${c}`);

                            let bgClass = 'bg-ink-black-900';
                            let shadowClass = '';
                            let animationClass = '';

                            if (isStart) {
                                bgClass = 'bg-pacific-cyan-500';
                                shadowClass = 'shadow-[0_0_15px_rgba(80,161,175,0.6)] z-10 scale-110 rounded-md';
                            } else if (isEnd) {
                                bgClass = 'bg-burnt-rose-500';
                                shadowClass = 'shadow-[0_0_15px_rgba(176,79,82,0.6)] z-10 scale-110 rounded-md';
                            } else if (isWall) {
                                bgClass = 'bg-ink-black-600';
                                animationClass = 'animate-pop-in';
                            } else if (isPath) {
                                bgClass = 'bg-icy-blue-400';
                                shadowClass = 'shadow-[0_0_15px_rgba(75,171,231,0.6)] z-10 scale-105';
                                animationClass = 'animate-pulse';
                            } else if (isVisited) {
                                bgClass = 'bg-smart-blue-500/50';
                                animationClass = 'animate-fade-in';
                            }

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => toggleWall(r, c)}
                                    className={`w-[26px] h-[26px] ${bgClass} ${shadowClass} ${animationClass} cursor-pointer hover:brightness-125 transition-all duration-150`}
                                />
                            );
                        })
                    ))}
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                <div className="bg-ink-black-900/40 p-8 rounded-3xl border border-ink-black-800/50 shadow-lg hover:border-pacific-cyan-500/30 transition-colors group">
                    <h3 className="text-xs font-bold text-pacific-cyan-500 uppercase tracking-widest mb-3">Time Complexity</h3>
                    <p className="text-3xl font-bold text-white mb-1">O((V+E) log V)</p>
                    <p className="text-ink-black-400 text-sm">Using Priority Queue</p>
                </div>
                <div className="bg-ink-black-900/40 p-8 rounded-3xl border border-ink-black-800/50 shadow-lg hover:border-burnt-rose-500/30 transition-colors group">
                    <h3 className="text-xs font-bold text-burnt-rose-400 uppercase tracking-widest mb-3">Space Complexity</h3>
                    <p className="text-3xl font-bold text-white mb-1">O(V)</p>
                    <p className="text-ink-black-400 text-sm">Distance & Parent Maps</p>
                </div>
            </div>
        </div>
    );
};

export default PathfindingVisualizer;
