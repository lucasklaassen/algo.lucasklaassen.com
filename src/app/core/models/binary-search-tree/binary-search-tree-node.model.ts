export class BinarySearchTreeNode<V> {
  public right: BinarySearchTreeNode<V>;
  public left: BinarySearchTreeNode<V>;
  public key: number;
  public value: V;

  constructor(args?: BinarySearchTreeNode<V>) {
    this.right = (args && args.right) || null;
    this.left = (args && args.left) || null;
    this.key = args && args.key;
    this.value = args && args.value;
  }
}
