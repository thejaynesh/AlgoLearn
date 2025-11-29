import React from 'react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-ink-black-200">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-white">About AlgoLearn</h2>
                <p className="text-xl text-ink-black-400">
                    An interactive educational platform designed to help you master fundamental computer science algorithms.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-ink-black-900/50 p-8 rounded-3xl border border-ink-black-800">
                    <h3 className="text-2xl font-bold text-icy-blue-400 mb-4">Sorting Algorithms</h3>
                    <p className="leading-relaxed text-ink-black-300">
                        Visualize how different sorting algorithms organize data. We cover O(n²) algorithms like Bubble and Insertion Sort,
                        as well as efficient O(n log n) algorithms like Merge and Quick Sort. Watch step-by-step comparisons and swaps
                        to understand the inner workings of each method.
                    </p>
                </div>

                <div className="bg-ink-black-900/50 p-8 rounded-3xl border border-ink-black-800">
                    <h3 className="text-2xl font-bold text-pacific-cyan-400 mb-4">Pathfinding</h3>
                    <p className="leading-relaxed text-ink-black-300">
                        Experiment with Dijkstra's algorithm on an interactive grid. Draw walls to create obstacles and watch how the
                        algorithm explores nodes to guarantee the shortest path from start to finish.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">How to Use</h3>
                <ul className="space-y-4 list-disc list-inside text-ink-black-300 ml-4">
                    <li>Select an algorithm from the top menu.</li>
                    <li>Adjust the <strong>Speed</strong> slider to slow down or speed up the visualization.</li>
                    <li>For <strong>Sorting</strong>, click "Reset Array" to generate new random data.</li>
                    <li>For <strong>Pathfinding</strong>, click and drag on the grid to draw walls, then run the algorithm.</li>
                </ul>
            </div>

            <div className="pt-8 border-t border-ink-black-800 text-center text-ink-black-500 text-sm">
                <p>Built with React and Tailwind CSS.</p>
            </div>
        </div>
    );
};

export default About;
