/*
 * cd to 4-Exercises folder and then run "node mergeIntervals.js"
 * Complete the 'getMergedIntervals' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY intervals as parameter.
 */
function mergeIntervals(intervals) {
    //== sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    let mergedIntervals = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const [currStart, currEnd] = intervals[i];
        const [prevStart, prevEnd] = mergedIntervals[mergedIntervals.length - 1];
        if (currStart <= prevEnd) {
            mergedIntervals[mergedIntervals.length - 1] = [Math.min(prevStart, currStart), Math.max(prevEnd, currEnd)];
        }
        else {
            mergedIntervals.push([currStart, currEnd]);
        }
    }
    return mergedIntervals;
}


let intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
let result = mergeIntervals(intervals);
console.log(result);
intervals = [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]];
result = mergeIntervals(intervals);
console.log(result)