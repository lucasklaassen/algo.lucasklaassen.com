import { BinarySearchTreeNode } from './binary-search-tree-node.model';

export class BinarySearchTree<V> {
  public root: BinarySearchTreeNode<V> = null;

  constructor() {}

  public fetch(key: number): V {
    this.validateKey(+key);
    const foundValue = this.fetchNode(+key, this.root);
    return foundValue.value;
  }

  private fetchNode(
    key: number,
    node: BinarySearchTreeNode<V>
  ): BinarySearchTreeNode<V> {
    if (node === null) {
      throw new RangeError('Key does not exist.');
    }
    if (+key === +node.key) {
      return node;
    }
    if (+key < +node.key) {
      return this.fetchNode(+key, node.left);
    }
    return this.fetchNode(+key, node.right);
  }

  public put(key: number, value: V): void {
    this.validateKey(key);
    const newNode = new BinarySearchTreeNode<V>({
      right: null,
      left: null,
      key: +key,
      value,
    });
    this.root = this.putValue(newNode, this.root);
  }

  private putValue(
    newNode: BinarySearchTreeNode<V>,
    currentNode: BinarySearchTreeNode<V>
  ): BinarySearchTreeNode<V> {
    if (currentNode === null) {
      return newNode;
    }
    if (+newNode.key < +currentNode.key) {
      currentNode.left = this.putValue(newNode, currentNode.left);
    }
    if (+newNode.key > +currentNode.key) {
      currentNode.right = this.putValue(newNode, currentNode.right);
    }
    if (+newNode.key === +currentNode.key) {
      currentNode.value = newNode.value;
    }
    return currentNode;
  }

  public remove(key: number): void {
    this.root = this.removeNode(+key, this.root);
  }

  public removeNode(
    key: number,
    node: BinarySearchTreeNode<V>
  ): BinarySearchTreeNode<V> {
    if (node === null) {
      return null;
    }
    if (+key === +node.key) {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left !== null && node.right === null) {
        return node.left;
      }
      if (node.left === null && node.right !== null) {
        return node.right;
      }
      if (node.left !== null && node.right !== null) {
        node.key = +this.findMinKey(node.right);
        node.right = this.removeNode(node.key, node.right);
      }
    }
    if (+key < +node.key) {
      node.left = this.removeNode(+key, node.left);
    }
    if (+key > +node.key) {
      node.right = this.removeNode(+key, node.right);
    }
    return node;
  }

  private findMinKey(node: BinarySearchTreeNode<V>): number {
    if (node.left === null) {
      return +node.key;
    }
    let minKey;
    while (node.left !== null) {
      minKey = +node.left.key;
      node = node.left;
    }
    return minKey;
  }

  private validateKey(key: number): void {
    if (key === null || key === undefined || isNaN(+key)) {
      throw new TypeError('Key is not defined.');
    }
  }
}
