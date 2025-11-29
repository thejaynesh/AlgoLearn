from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from algorithms.sorting import (
    merge_sort_steps, 
    bubble_sort_steps, 
    selection_sort_steps, 
    insertion_sort_steps, 
    quick_sort_steps
)
from algorithms.pathfinding import dijkstra_steps
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SortRequest(BaseModel):
    data: list[int]

class PathfindingRequest(BaseModel):
    grid: list[list[int]]
    start: list[int]
    end: list[int]

@app.get("/")
def read_root():
    return {"message": "AlgoLearn API is running"}

@app.post("/sort/merge")
def get_merge_sort_steps(request: SortRequest):
    steps = merge_sort_steps(request.data)
    return {"steps": steps}

@app.post("/sort/bubble")
def get_bubble_sort_steps(request: SortRequest):
    steps = bubble_sort_steps(request.data)
    return {"steps": steps}

@app.post("/sort/selection")
def get_selection_sort_steps(request: SortRequest):
    steps = selection_sort_steps(request.data)
    return {"steps": steps}

@app.post("/sort/insertion")
def get_insertion_sort_steps(request: SortRequest):
    steps = insertion_sort_steps(request.data)
    return {"steps": steps}

@app.post("/sort/quick")
def get_quick_sort_steps(request: SortRequest):
    steps = quick_sort_steps(request.data)
    return {"steps": steps}

@app.post("/pathfinding/dijkstra")
def get_dijkstra_steps(request: PathfindingRequest):
    steps = dijkstra_steps(request.grid, request.start, request.end)
    return {"steps": steps}
