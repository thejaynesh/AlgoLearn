
export const mergeSortSteps = (arr) => {
    const steps = [];
    const fullArray = [...arr];
    steps.push({ type: "initial", array: [...fullArray] });

    const mergeInPlace = (start, mid, end) => {
        const left = fullArray.slice(start, mid + 1);
        const right = fullArray.slice(mid + 1, end + 1);

        let i = 0;
        let j = 0;
        let k = start;

        while (i < left.length && j < right.length) {
            steps.push({
                type: "compare",
                indices: [start + i, mid + 1 + j],
                values: [left[i], right[j]],
                array: [...fullArray]
            });

            if (left[i] <= right[j]) {
                fullArray[k] = left[i];
                steps.push({
                    type: "overwrite",
                    index: k,
                    value: left[i],
                    array: [...fullArray]
                });
                i++;
            } else {
                fullArray[k] = right[j];
                steps.push({
                    type: "overwrite",
                    index: k,
                    value: right[j],
                    array: [...fullArray]
                });
                j++;
            }
            k++;
        }

        while (i < left.length) {
            fullArray[k] = left[i];
            steps.push({
                type: "overwrite",
                index: k,
                value: left[i],
                array: [...fullArray]
            });
            i++;
            k++;
        }

        while (j < right.length) {
            fullArray[k] = right[j];
            steps.push({
                type: "overwrite",
                index: k,
                value: right[j],
                array: [...fullArray]
            });
            j++;
            k++;
        }
    };

    const recursiveMergeSort = (start, end) => {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);
        recursiveMergeSort(start, mid);
        recursiveMergeSort(mid + 1, end);
        mergeInPlace(start, mid, end);
    };

    recursiveMergeSort(0, fullArray.length - 1);
    return steps;
};

export const bubbleSortSteps = (arr) => {
    const steps = [];
    const fullArray = [...arr];
    const n = fullArray.length;

    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                type: "compare",
                indices: [j, j + 1],
                values: [fullArray[j], fullArray[j + 1]],
                array: [...fullArray]
            });

            if (fullArray[j] > fullArray[j + 1]) {
                [fullArray[j], fullArray[j + 1]] = [fullArray[j + 1], fullArray[j]];
                swapped = true;
                steps.push({
                    type: "swap",
                    indices: [j, j + 1],
                    values: [fullArray[j], fullArray[j + 1]],
                    array: [...fullArray]
                });
            }
        }
        if (!swapped) break;
    }
    return steps;
};

export const selectionSortSteps = (arr) => {
    const steps = [];
    const fullArray = [...arr];
    const n = fullArray.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: "compare",
                indices: [minIdx, j],
                values: [fullArray[minIdx], fullArray[j]],
                array: [...fullArray]
            });
            if (fullArray[j] < fullArray[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [fullArray[i], fullArray[minIdx]] = [fullArray[minIdx], fullArray[i]];
            steps.push({
                type: "swap",
                indices: [i, minIdx],
                values: [fullArray[i], fullArray[minIdx]],
                array: [...fullArray]
            });
        }
    }
    return steps;
};

export const insertionSortSteps = (arr) => {
    const steps = [];
    const fullArray = [...arr];
    const n = fullArray.length;

    for (let i = 1; i < n; i++) {
        let key = fullArray[i];
        let j = i - 1;

        steps.push({
            type: "select_key",
            index: i,
            value: key,
            array: [...fullArray]
        });

        while (j >= 0 && fullArray[j] > key) {
            steps.push({
                type: "compare",
                indices: [j, j + 1], // conceptually comparing key with j
                values: [fullArray[j], key],
                array: [...fullArray]
            });

            fullArray[j + 1] = fullArray[j];
            steps.push({
                type: "overwrite",
                index: j + 1,
                value: fullArray[j],
                array: [...fullArray]
            });
            j--;
        }

        fullArray[j + 1] = key;
        steps.push({
            type: "overwrite",
            index: j + 1,
            value: key,
            array: [...fullArray]
        });
    }
    return steps;
};

export const quickSortSteps = (arr) => {
    const steps = [];
    const fullArray = [...arr];

    const partition = (low, high) => {
        const pivot = fullArray[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({
                type: "compare",
                indices: [j, high],
                values: [fullArray[j], pivot],
                array: [...fullArray]
            });

            if (fullArray[j] < pivot) {
                i++;
                [fullArray[i], fullArray[j]] = [fullArray[j], fullArray[i]];
                steps.push({
                    type: "swap",
                    indices: [i, j],
                    values: [fullArray[i], fullArray[j]],
                    array: [...fullArray]
                });
            }
        }

        [fullArray[i + 1], fullArray[high]] = [fullArray[high], fullArray[i + 1]];
        steps.push({
            type: "swap",
            indices: [i + 1, high],
            values: [fullArray[i + 1], fullArray[high]],
            array: [...fullArray]
        });
        return i + 1;
    };

    const recursiveQuickSort = (low, high) => {
        if (low < high) {
            const pi = partition(low, high);
            recursiveQuickSort(low, pi - 1);
            recursiveQuickSort(pi + 1, high);
        }
    };

    recursiveQuickSort(0, fullArray.length - 1);
    return steps;
};
