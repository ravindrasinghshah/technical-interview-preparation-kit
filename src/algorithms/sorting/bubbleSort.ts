/**
 * Bubble sort algorithm with TypeScript types
 * 
 * Bubble sort repeatedly steps through a list, compares adjacent elements and swaps them if they are in the wrong order.
 * This process is repeated until the list is sorted.
 * 
 * Time Complexity:
 * - Worst case: O(n^2)
 * - Best case: O(n)
 * - Average case: O(n^2)
 * 
 * Space Complexity: O(1) - in-place sorting algorithm
 * 
 * @see https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/
 */

/**
 * Sorts an array of numbers using the bubble sort algorithm
 * @param arr - The array of numbers to sort
 * @returns A new sorted array (does not modify the original array)
 */
export function bubbleSort(arr: number[]): number[] {
    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const length = sortedArray.length;
    
    // Outer loop for number of passes
    for (let i = 0; i < length; i++) {
        let swapped = false;
        
        // Inner loop for comparing adjacent elements
        // Last i elements are already sorted
        for (let j = 0; j < (length - i - 1); j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements using destructuring assignment
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return sortedArray;
}

/**
 * In-place version of bubble sort that modifies the original array
 * @param arr - The array of numbers to sort in place
 * @returns The same array reference, now sorted
 */
export function bubbleSortInPlace(arr: number[]): number[] {
    const length = arr.length;
    
    for (let i = 0; i < length; i++) {
        let swapped = false;
        
        for (let j = 0; j < (length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Default export for convenience
export default bubbleSort;
