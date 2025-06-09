/**
 * cd to Algos folder and then run "node arrayChunk.js"
   Given an array and chunk size, divide the array into many subarrays where each subarray is of the provided size.
   Examples:
    // Chunk size two:
    chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]    
    // Chunk size two:
    chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]    
    // Chunk size 3:
    chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]    
    // Chunk size 4:
    chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]    
    // Chunk size 10:
    chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
 */
//=== use 2 arrays
function chunk(arr, size) {
    let ans = [];
    let subarray = [];
    for (let i = 0; i < arr.length; i++) {
        subarray.push(arr[i]);
        if (subarray.length === size) {
            ans.push([...subarray]);
            subarray = [];
        }
    }
    if (subarray.length > 0)
        ans.push([...subarray]);
    return ans;
}

//=== use single array
function chunk2(arr, size) {
    let chunked = [];
    for (let i = 0; i < arr.length; i++) {
        const last = chunked[chunked.length - 1];
        if (last === undefined || last.length === size) { chunked.push([arr[i]]) }
        else { last.push(arr[i]); }
    }
    return chunked;
}
//== use slice method
function chunk3(arr, size) {
    let chunked = [];
    let index = 0;
    while (index < arr.length) {
        chunked.push(arr.slice(index, index + size));
        index += size;
    }
    return chunked;
}


let arr = [1, 2, 3, 4], n = 2;
let result = chunk(arr, n);
console.log(`${arr} : subset size ${n} :`, result);

arr = [1, 2, 3, 4, 5, 6, 7, 8], n = 3;
result = chunk2(arr, n);
console.log(`${arr} : subset size ${n} :`, result);

arr = [1, 2, 3, 4, 5], n = 4;
result = chunk3(arr, n);
console.log(`${arr} : subset size ${n} :`, result);