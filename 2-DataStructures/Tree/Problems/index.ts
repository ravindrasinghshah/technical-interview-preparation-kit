/* run "npx ts-node 2-DataStructures\Tree\Problems\index.ts"
Trees are DS which contains left and right node.
Any node without child is a leaf node.
*/

export class TreeNode {
  data: number;
  children: Array<TreeNode>;
  constructor(data: number) {
    this.data = data;
    this.children = [];
  }

  add(data: number) {
    this.children.push(new TreeNode(data));
  }
  remove(data: number) {
    this.children = this.children.filter((node) => {
      return node.data !== data;
    });
  }
}

export class Tree {
  root: TreeNode | null;
  constructor() {
    this.root = null;
  }

  traverseBF() {
    let queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      console.log("traverseBF:", node?.data);
      if (node) queue.push(...node.children);
    }
  }

  traverseDF() {
    let stack = [this.root];
    while (stack.length) {
      const node = stack.pop();
      console.log("traverseDF ", node?.data);
      if (node) stack.push(...node.children);
    }
  }
}

(() => {
//   const tree = new Tree();
//   tree.root = new TreeNode(2);
//   tree.root.add(1);
//   tree.root.add(3);

//   console.log("Tree:", JSON.stringify(tree));
//   tree.traverseBF();
 //tree.traverseDF();
  //tree.root.remove(3); console.log("Tree after remove:", JSON.stringify(tree));
})();
