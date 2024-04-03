export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        let pivotIdx = partition(array, startIdx, endIdx, animations);
        quickSortHelper(array, startIdx, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
}

function partition(array, startIdx, endIdx, animations) {
    let pivotValue = array[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j <= endIdx - 1; j++) {
        animations.push([j, endIdx]); // Compare j and pivot
        animations.push([j, endIdx]); // Revert color
        if (array[j] < pivotValue) {
            i++;
            animations.push([i, array[j], true]); // Swap
            animations.push([j, array[i], true]); // Swap
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    animations.push([i + 1, array[endIdx], true]); // Swap
    animations.push([endIdx, array[i + 1], true]); // Swap
    [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];
    return i + 1;
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function heapify(array, length, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < length && array[left] > array[largest]) {
        largest = left;
    }
    
    if (right < length && array[right] > array[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        animations.push([i, largest]); // Compare
        animations.push([i, largest]); // Revert color
        animations.push([i, array[largest], true]); // Swap
        animations.push([largest, array[i], true]); // Swap
        [array[i], array[largest]] = [array[largest], array[i]];
        
        heapify(array, length, largest, animations);
    }
}

export function getHeapSortAnimations(array) {
    const animations = [];
    let length = array.length;
    
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(array, length, i, animations);
    }
    
    for (let i = length - 1; i > 0; i--) {
        animations.push([0, i]); // Compare
        animations.push([0, i]); // Revert color
        animations.push([0, array[i], true]); // Swap
        animations.push([i, array[0], true]); // Swap
        [array[0], array[i]] = [array[i], array[0]];
        
        heapify(array, i, 0, animations);
    }
    
    return animations;
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    let len = array.length;
    let isSwapped;
    for (let i = 0; i < len; i++) {
        isSwapped = false;
        for (let j = 0; j < len - i - 1; j++) {
            animations.push([j, j + 1]); // Compare: Push to change color
            animations.push([j, j + 1]); // Revert: Push to revert color
            if (array[j] > array[j + 1]) {
                // Swap if the item is greater than the next item.
                animations.push([j, array[j + 1], true]); // Swap: Push to change height
                animations.push([j + 1, array[j], true]); // Swap: Push to change height
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                isSwapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!isSwapped) break;
    }
    return animations;
}
