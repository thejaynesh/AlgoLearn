def merge_sort_steps(arr):
    steps = []
    full_array = list(arr)
    steps.append({"type": "initial", "array": list(full_array)})
    
    def recursive_merge_sort(start, end):
        if start >= end:
            return

        mid = (start + end) // 2
        recursive_merge_sort(start, mid)
        recursive_merge_sort(mid + 1, end)
        merge_in_place(start, mid, end)

    def merge_in_place(start, mid, end):
        left = full_array[start:mid+1]
        right = full_array[mid+1:end+1]
        
        i = 0
        j = 0
        k = start
        
        while i < len(left) and j < len(right):
            steps.append({
                "type": "compare",
                "indices": [start + i, mid + 1 + j],
                "values": [left[i], right[j]],
                "array": list(full_array)
            })
            
            if left[i] <= right[j]:
                full_array[k] = left[i]
                steps.append({
                    "type": "overwrite",
                    "index": k,
                    "value": left[i],
                    "array": list(full_array)
                })
                i += 1
            else:
                full_array[k] = right[j]
                steps.append({
                    "type": "overwrite",
                    "index": k,
                    "value": right[j],
                    "array": list(full_array)
                })
                j += 1
            k += 1
            
        while i < len(left):
            full_array[k] = left[i]
            steps.append({
                "type": "overwrite",
                "index": k,
                "value": left[i],
                "array": list(full_array)
            })
            i += 1
            k += 1
            
        while j < len(right):
            full_array[k] = right[j]
            steps.append({
                "type": "overwrite",
                "index": k,
                "value": right[j],
                "array": list(full_array)
            })
            j += 1
            k += 1

    recursive_merge_sort(0, len(full_array) - 1)
    return steps

def bubble_sort_steps(arr):
    steps = []
    full_array = list(arr)
    n = len(full_array)
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            steps.append({
                "type": "compare",
                "indices": [j, j + 1],
                "values": [full_array[j], full_array[j + 1]],
                "array": list(full_array)
            })
            
            if full_array[j] > full_array[j + 1]:
                full_array[j], full_array[j + 1] = full_array[j + 1], full_array[j]
                swapped = True
                steps.append({
                    "type": "swap",
                    "indices": [j, j + 1],
                    "values": [full_array[j], full_array[j + 1]],
                    "array": list(full_array)
                })
        if not swapped:
            break
            
    return steps

def selection_sort_steps(arr):
    steps = []
    full_array = list(arr)
    n = len(full_array)
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            steps.append({
                "type": "compare",
                "indices": [min_idx, j],
                "values": [full_array[min_idx], full_array[j]],
                "array": list(full_array)
            })
            if full_array[j] < full_array[min_idx]:
                min_idx = j
                
        if min_idx != i:
            full_array[i], full_array[min_idx] = full_array[min_idx], full_array[i]
            steps.append({
                "type": "swap",
                "indices": [i, min_idx],
                "values": [full_array[i], full_array[min_idx]],
                "array": list(full_array)
            })
            
    return steps

def insertion_sort_steps(arr):
    steps = []
    full_array = list(arr)
    n = len(full_array)
    
    for i in range(1, n):
        key = full_array[i]
        j = i - 1
        
        steps.append({
            "type": "select_key",
            "index": i,
            "value": key,
            "array": list(full_array)
        })
        
        while j >= 0 and full_array[j] > key:
            steps.append({
                "type": "compare",
                "indices": [j, j + 1], # conceptually comparing key with j
                "values": [full_array[j], key],
                "array": list(full_array)
            })
            
            full_array[j + 1] = full_array[j]
            steps.append({
                "type": "overwrite",
                "index": j + 1,
                "value": full_array[j],
                "array": list(full_array)
            })
            j -= 1
            
        full_array[j + 1] = key
        steps.append({
            "type": "overwrite",
            "index": j + 1,
            "value": key,
            "array": list(full_array)
        })
        
    return steps

def quick_sort_steps(arr):
    steps = []
    full_array = list(arr)
    
    def partition(low, high):
        pivot = full_array[high]
        i = low - 1
        
        for j in range(low, high):
            steps.append({
                "type": "compare",
                "indices": [j, high],
                "values": [full_array[j], pivot],
                "array": list(full_array)
            })
            
            if full_array[j] < pivot:
                i += 1
                full_array[i], full_array[j] = full_array[j], full_array[i]
                steps.append({
                    "type": "swap",
                    "indices": [i, j],
                    "values": [full_array[i], full_array[j]],
                    "array": list(full_array)
                })
                
        full_array[i + 1], full_array[high] = full_array[high], full_array[i + 1]
        steps.append({
            "type": "swap",
            "indices": [i + 1, high],
            "values": [full_array[i + 1], full_array[high]],
            "array": list(full_array)
        })
        return i + 1

    def recursive_quick_sort(low, high):
        if low < high:
            pi = partition(low, high)
            recursive_quick_sort(low, pi - 1)
            recursive_quick_sort(pi + 1, high)

    recursive_quick_sort(0, len(full_array) - 1)
    return steps
