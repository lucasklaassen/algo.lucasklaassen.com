import { SinglyLinkedListNode } from '../linked-list/singly-linked-list-node.model';

export class Stack<T> {
  private top: SinglyLinkedListNode<T> = null;
  private size: number = 0;

  constructor(args?: Stack<T>) {
    this.top = (args && args.top) || null;
  }

  public length(): number {
    return this.size;
  }

  public peekTop(): SinglyLinkedListNode<T> {
    if (this.top === null) {
      throw new RangeError('There are no nodes to view.');
    }
    return this.top;
  }

  public push(data: T): void {
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    if (this.top === null) {
      this.top = newNode;
    } else {
      const newNext = this.top;
      newNode.next = newNext;
      this.top = newNode;
    }
    this.size++;
  }

  public pop(): SinglyLinkedListNode<T> {
    if (this.top === null) {
      throw new RangeError('There are no nodes to remove.');
    }
    const currentTop = this.top;
    this.top = this.top.next;
    this.size--;
    return currentTop;
  }

  public forEach(callback: Function): void {
    let currentNode = this.top;
    while (currentNode !== null) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }
}
