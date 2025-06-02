/**
 * cd to algos folder and then run "node levelWidth.js"
 * Coding Exercise - Level Width
   Given the root node of a tree, return an array where each element is the width of the tree at each level.

    Example:

      0
    / |  \
   1  2   3
   |      |
   4      5
    Answer:

    [1, 3, 2]
 */

class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }
}

function levelWidth(root) {

}

