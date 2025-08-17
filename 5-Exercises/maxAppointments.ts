/**
 * run "npx ts-node 5-Exercises\maxAppointments.ts"
 * Q: There is one meeting room in a firm. There are N meetings in the form of (S[i], F[i]) where S[i] is
the start time of meeting i and F[i] is finish time of meeting i. The task is to find the maximum
number of meetings that can be accommodated in the meeting room. Print all meeting numbers.
Example: Input : s[] = {1, 3, 0, 5, 8, 5}, f[] = {2, 4, 6, 7, 9, 9}
Output : 1 2 4 5
First meeting [1, 2]
Second meeting [3, 4]
Fourth meeting [5, 7]
Fifth meeting [8, 9]

Example: Input : s[] = {75250, 50074, 43659, 8931, 11273, 27545, 50879, 77924}, f[] = {112960, 114515, 81825, 93424, 54316, 35533, 73383, 160252 }
Output : 6 7 1
 */

function maxAppointments(s: Array<number>, f: Array<number>) {
  let meetings = [];
  for (let i = 0; i < s.length; i++) {
    meetings.push([i, s[i], f[i]]);
  }
  meetings.sort((a, b) => a[2] - b[2]);
  let prevEndTime = 0;
  for (let i = 0; i < meetings.length; i++) {
    const startTime = meetings[i][1];
    if (startTime >= prevEndTime) {
      prevEndTime = meetings[i][2];
      console.log(startTime, prevEndTime);
    }
  }
}

(() => {
  let s = [1, 3, 0, 5, 8, 5],
    f = [2, 4, 6, 7, 9, 9];
  maxAppointments(s, f);

  console.log(`=================`);
  (s = [75250, 50074, 43659, 8931, 11273, 27545, 50879, 77924]),
    (f = [112960, 114515, 81825, 93424, 54316, 35533, 73383, 160252]);
  maxAppointments(s, f);
})();
