/*
Binary Search Trees are which contains left and right node.
It's balanced with the weight of nodes - left value is less than parent whereas right value is greater than parent.
Any node without child is a leaf node.
*/

class Node {
  data: number;
  left: Node | null;
  right: Node | null;
  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  insert(data: number) {
    if (data < this.data && this.left) {
      this.left.insert(data);
    } else if (data < this.data) {
      this.left = new Node(data);
    } else if (data > this.data && this.right) {
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new Node(data);
    }
  }

  contains(data: number): Node | null {
    if (data === this.data) {
      return this;
    }

    if (data < this.data && this.left) {
      return this.left.contains(data);
    } else if (data > this.data && this.right) {
      return this.right.contains(data);
    }
    return null;
  }
}

// let root = new Node(0);
// root.insert(-1);
// root.insert(2); root.insert(3);
// console.log("BST :", root);

export { Node };
