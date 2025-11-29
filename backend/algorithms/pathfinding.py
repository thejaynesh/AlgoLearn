import heapq

def dijkstra_steps(grid, start, end):
    # grid is a 2D array where 0 is empty, 1 is wall
    rows = len(grid)
    cols = len(grid[0])
    
    steps = []
    
    pq = [(0, tuple(start))] # (distance, (r, c))
    distances = {}
    for r in range(rows):
        for c in range(cols):
            distances[(r,c)] = float('inf')
            
    distances[tuple(start)] = 0
    previous = {}
    visited = set()
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_node in visited:
            continue
        
        visited.add(current_node)
        steps.append({"type": "visit", "node": current_node})
        
        if current_node == tuple(end):
            break
        
        r, c = current_node
        neighbors = [
            (r-1, c), (r+1, c), (r, c-1), (r, c+1)
        ]
        
        for nr, nc in neighbors:
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                new_dist = current_dist + 1
                if new_dist < distances[(nr, nc)]:
                    distances[(nr, nc)] = new_dist
                    previous[(nr, nc)] = current_node
                    heapq.heappush(pq, (new_dist, (nr, nc)))
                    
    # Reconstruct path
    path = []
    curr = tuple(end)
    if curr in previous or curr == tuple(start):
        while curr:
            path.append(curr)
            curr = previous.get(curr)
            
    steps.append({"type": "path", "nodes": path[::-1]})
    return steps
