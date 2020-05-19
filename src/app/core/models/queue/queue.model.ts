import { SinglyLinkedListNode } from '../linked-list/singly-linked-list-node.model';

export class Queue<T> {
  private front: SinglyLinkedListNode<T> = null;
  private rear: SinglyLinkedListNode<T> = null;
  private size: number = 0;

  constructor(args?: Queue<T>) {
    this.front = (args && args.front) || null;
    this.rear = (args && args.rear) || null;
  }

  public length(): number {
    return this.size;
  }

  public peek(): SinglyLinkedListNode<T> {
    if (this.front === null) {
      throw new RangeError('There are no nodes to view.');
    }
    return this.front;
  }

  public enqueue(data: T): void {
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    if (this.front === null) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      const previousRear = this.rear;
      previousRear.next = newNode;
      this.rear = newNode;
      if (this.front.next === null) {
        this.front.next = this.rear;
      }
    }
    this.size++;
  }

  public dequeue(): SinglyLinkedListNode<T> {
    if (this.front === null) {
      throw new RangeError('There are no nodes to remove.');
    }
    const firstItem = this.front;
    this.front = this.front.next;
    if (this.front === null) {
      this.rear = null;
    }
    this.size--;
    return firstItem;
  }

  public forEach(callback: Function): void {
    let currentNode = this.front;
    while (currentNode !== null) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }
}
