/**
 * cd to Algos folder and then run "node IsDivisibleBy5.js"
   Form a largest number which is divisible by 5
   Constraint: nums is an array of positive numbers [0-9]
 */
function IsDivisibleBy5(nums) {
    if (nums.indexOf(0) === -1 && nums.indexOf(5) === -1) return 0;

    let m = new Map();
    for (let i = 0; i < nums.length; i++) {
        m.set(nums[i], (m.get(nums[i]) || 0) + 1);
    }

    const hasZero = m.get(0) || 0;
    let n = 9;
    let arr = [];
    while (n >= 0) {
        const count = m.get(n) || 0;
        if (count > 0) {
            if (n === 5 && hasZero > 0) { for (let k = 0; k < count; k++) { arr.push(n); } }
            else if (n === 5 && hasZero === 0) { for (let k = 0; k < count - 1; k++) { arr.push(n); } }
            else { for (let k = 0; k < count; k++) { arr.push(n); } }
        }
        n--;
    }
    if (hasZero === 0) arr.push(5);
    return arr.join("");
}


let nums = [1, 0, 0, 1];
let result = IsDivisibleBy5(nums);
console.log(`${nums} - largest number possible: ${result}`);

nums = [5, 1, 2, 5];
result = IsDivisibleBy5(nums);
console.log(`${nums} - largest number possible: ${result}`);

nums = [5, 1, 2];
result = IsDivisibleBy5(nums);
console.log(`${nums} - largest number possible: ${result}`);

nums = [1];
result = IsDivisibleBy5(nums);
console.log(`${nums} - largest number possible: ${result}`);