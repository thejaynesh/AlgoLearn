
// Priority Queue implementation for Dijkstra
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

export const dijkstraSteps = (grid, start, end) => {
    // grid is a 2D array where 0 is empty, 1 is wall
    const rows = grid.length;
    const cols = grid[0].length;

    const steps = [];

    const pq = new PriorityQueue();
    pq.enqueue(start, 0);

    const distances = {};
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            distances[`${r},${c}`] = Infinity;
        }
    }

    distances[`${start[0]},${start[1]}`] = 0;
    const previous = {};
    const visited = new Set();

    while (!pq.isEmpty()) {
        const { val: currentNode, priority: currentDist } = pq.dequeue();
        const currentNodeKey = `${currentNode[0]},${currentNode[1]}`;

        if (visited.has(currentNodeKey)) {
            continue;
        }

        visited.add(currentNodeKey);
        steps.push({ type: "visit", node: currentNode });

        if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
            break;
        }

        const [r, c] = currentNode;
        const neighbors = [
            [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
        ];

        for (const [nr, nc] of neighbors) {
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== 1) {
                const newDist = currentDist + 1;
                const neighborKey = `${nr},${nc}`;

                if (newDist < distances[neighborKey]) {
                    distances[neighborKey] = newDist;
                    previous[neighborKey] = currentNode;
                    pq.enqueue([nr, nc], newDist);
                }
            }
        }
    }

    // Reconstruct path
    const path = [];
    let curr = end;
    let currKey = `${curr[0]},${curr[1]}`;
    const startKey = `${start[0]},${start[1]}`;

    // Check if end node was reached (it should have a previous node or be the start)
    if (previous[currKey] || currKey === startKey) {
        while (curr) {
            path.push(curr);
            currKey = `${curr[0]},${curr[1]}`;
            curr = previous[currKey];
        }
    }

    steps.push({ type: "path", nodes: path.reverse() });
    return steps;
};
