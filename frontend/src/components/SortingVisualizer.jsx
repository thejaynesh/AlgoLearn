import React, { useState, useEffect, useRef } from 'react';
import {
    mergeSortSteps,
    bubbleSortSteps,
    selectionSortSteps,
    insertionSortSteps,
    quickSortSteps
} from '../algorithms/sorting';

const ALGORITHMS = {
    'Merge Sort': {
        func: mergeSortSteps,
        time: 'O(n log n)',
        space: 'O(n)',
        desc: 'A highly efficient, stable, divide-and-conquer algorithm. It recursively splits the array into halves, sorts them, and then merges the sorted halves to produce the final sorted array.'
    },
    'Bubble Sort': {
        func: bubbleSortSteps,
        time: 'O(n²)',
        space: 'O(1)',
        desc: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.'
    },
    'Selection Sort': {
        func: selectionSortSteps,
        time: 'O(n²)',
        space: 'O(1)',
        desc: 'An in-place comparison sort. It divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items.'
    },
    'Insertion Sort': {
        func: insertionSortSteps,
        time: 'O(n²)',
        space: 'O(1)',
        desc: 'Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.'
    },
    'Quick Sort': {
        func: quickSortSteps,
        time: 'O(n log n)',
        space: 'O(log n)',
        desc: 'An efficient, divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.'
    },
};

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState('Merge Sort');
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        resetArray();
        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
        };
    }, []);

    const resetArray = () => {
        if (animationRef.current) clearInterval(animationRef.current);
        const newArray = [];
        for (let i = 0; i < 60; i++) {
            newArray.push(Math.floor(Math.random() * 400) + 20);
        }
        setArray(newArray);
        setTotalSteps(0);
        setCurrentStep(0);
        setIsSorting(false);
    };

    const handleSort = () => {
        if (isSorting) return;
        setIsSorting(true);
        try {
            const sortFunction = ALGORITHMS[selectedAlgo].func;
            const steps = sortFunction(array);
            setTotalSteps(steps.length);
            animate(steps);
        } catch (error) {
            console.error("Error generating sort steps:", error);
            setIsSorting(false);
        }
    };

    const animate = (stepsToAnimate) => {
        let stepIndex = 0;
        if (animationRef.current) clearInterval(animationRef.current);

        animationRef.current = setInterval(() => {
            if (stepIndex >= stepsToAnimate.length) {
                clearInterval(animationRef.current);
                setIsSorting(false);
                return;
            }

            const step = stepsToAnimate[stepIndex];
            if (step.array) {
                setArray(step.array);
            }

            setCurrentStep(stepIndex + 1);
            stepIndex++;
        }, speed);
    };

    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value));
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="text-center space-y-4 mb-4">
                <h2 className="text-4xl font-bold text-white">Sorting Visualizer</h2>
                <p className="text-ink-black-400 max-w-2xl mx-auto">
                    Select an algorithm to see how it works step-by-step.
                </p>
            </div>

            {/* Controls Card */}
            <div className="bg-ink-black-900/50 rounded-2xl p-6 border border-ink-black-800">
                <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">

                    {/* Algorithm Selection */}
                    <div className="flex flex-wrap justify-center gap-2 w-full xl:w-auto">
                        {Object.keys(ALGORITHMS).map((algo) => (
                            <button
                                key={algo}
                                onClick={() => !isSorting && setSelectedAlgo(algo)}
                                disabled={isSorting}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedAlgo === algo
                                    ? 'bg-icy-blue-500 text-white shadow-md'
                                    : 'bg-ink-black-800 text-ink-black-400 hover:bg-ink-black-700 hover:text-ink-black-200'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {algo}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons & Speed */}
                    <div className="flex flex-wrap items-center gap-6 justify-center w-full xl:w-auto">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-ink-black-500 uppercase">Speed</span>
                            <input
                                type="range"
                                min="5"
                                max="200"
                                step="5"
                                value={speed}
                                onChange={handleSpeedChange}
                                className="w-32 h-1.5 bg-ink-black-800 rounded-lg appearance-none cursor-pointer accent-icy-blue-500"
                                disabled={isSorting}
                            />
                        </div>

                        <div className="h-8 w-px bg-ink-black-800 hidden md:block"></div>

                        <button
                            onClick={resetArray}
                            disabled={isSorting}
                            className="px-5 py-2 bg-ink-black-800 hover:bg-ink-black-700 text-ink-black-300 rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                        >
                            Reset
                        </button>

                        <button
                            onClick={handleSort}
                            disabled={isSorting}
                            className="px-6 py-2 bg-icy-blue-600 hover:bg-icy-blue-500 text-white rounded-lg transition-colors font-semibold text-sm shadow-lg shadow-icy-blue-900/20 disabled:opacity-50 min-w-[120px]"
                        >
                            {isSorting ? 'Sorting...' : 'Start'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="relative w-full h-[400px] bg-ink-black-900/30 rounded-2xl p-4 border border-ink-black-800 flex items-end justify-center gap-1 overflow-hidden">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="w-full rounded-t-sm transition-all duration-200"
                        style={{
                            height: `${(value / 450) * 100}%`,
                            backgroundColor: isSorting ? '#4babe7' : '#50647c', // icy-blue-400 : ink-black-600
                        }}
                    ></div>
                ))}
            </div>

            {/* Description & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-ink-black-900/50 p-6 rounded-2xl border border-ink-black-800">
                    <h3 className="text-lg font-bold text-white mb-2">{selectedAlgo}</h3>
                    <p className="text-ink-black-300 leading-relaxed text-sm">
                        {ALGORITHMS[selectedAlgo].desc}
                    </p>
                </div>

                <div className="bg-ink-black-900/50 p-6 rounded-2xl border border-ink-black-800 flex flex-col justify-center gap-4">
                    <div className="flex justify-between items-center border-b border-ink-black-800 pb-3">
                        <span className="text-sm text-ink-black-400">Time Complexity</span>
                        <span className="font-mono font-bold text-icy-blue-400">{ALGORITHMS[selectedAlgo].time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-ink-black-400">Space Complexity</span>
                        <span className="font-mono font-bold text-smart-blue-400">{ALGORITHMS[selectedAlgo].space}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;
