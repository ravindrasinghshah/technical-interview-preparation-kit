/*
Trees are DS which contains left and right node.
Any node without child is a leaf node.
*/

class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }
    remove(data) {
        this.children = this.children.filter(node => {
            return node.data !== data;
        });
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    traverseBF(fn) {
        let arr = [this.root];
        while (arr.length) {
            const node = arr.shift();
            arr.push(...node.children);
            console.log("arr pushed:", arr);
            fn(arr);
        }
    }

    traverseDF(fn) {
        let arr = [this.root];
        while (arr.length) {
            const node = arr.shift();
            arr.unshift(...node.children); //== add in front of the array
            fn(arr);
        }
    }
}

const tree = new Tree();
tree.root = new Node(2);
tree.root.children = new Node(3);
console.log("Tree:", JSON.stringify(tree));
//tree.root.remove(3); console.log("Tree after remove:", JSON.stringify(tree));
