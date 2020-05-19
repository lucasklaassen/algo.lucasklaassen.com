import { SinglyLinkedListNode } from './singly-linked-list-node.model';

export class SinglyLinkedList<T> {
  private first: SinglyLinkedListNode<T> = null;
  private last: SinglyLinkedListNode<T> = null;
  private size: number = 0;

  constructor(args?: SinglyLinkedList<T>) {
    this.first = (args && args.first) || null;
    this.last = (args && args.last) || null;
  }

  public length(): number {
    return this.size;
  }

  public fetch(index: number): SinglyLinkedListNode<T> {
    this.validateIndex(index);
    return this.fetchNode(index, this.first, 0);
  }

  private fetchNode(
    index: number,
    root: SinglyLinkedListNode<T>,
    currentIndex: number
  ): SinglyLinkedListNode<T> {
    if (root === null) {
      throw new RangeError('Index does not exist.');
    }
    return +currentIndex === +index
      ? root
      : this.fetchNode(index, root.next, ++currentIndex);
  }

  public addFirst(data: T): void {
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    if (this.first === null) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const newNext = this.first;
      newNode.next = newNext;
      this.first = newNode;
    }
    this.size++;
  }

  public addLast(data: T): void {
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    if (this.last === null) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
  }

  public addBefore(data: T, beforeIndex: number): void {
    this.validateIndex(beforeIndex);
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    this.first = this.addNodeBefore(newNode, beforeIndex, this.first, 0);
    this.size++;
  }

  private addNodeBefore(
    nodeToAdd: SinglyLinkedListNode<T>,
    beforeIndex: number,
    root: SinglyLinkedListNode<T>,
    currentIndex: number
  ): SinglyLinkedListNode<T> {
    let currentNode = root;
    if (root === null) {
      throw new RangeError('Before key does not exist.');
    }
    if (+currentIndex === +beforeIndex) {
      nodeToAdd.next = root;
      currentNode = nodeToAdd;
    } else {
      currentNode.next = this.addNodeBefore(
        nodeToAdd,
        beforeIndex,
        root.next,
        ++currentIndex
      );
    }
    return currentNode;
  }

  public addAfter(data: T, afterIndex: number): void {
    this.validateIndex(afterIndex);
    const newNode = new SinglyLinkedListNode<T>({ data, next: null });
    this.first = this.addNodeAfter(newNode, afterIndex, this.first, 0);
    this.size++;
  }

  private addNodeAfter(
    nodeToAdd: SinglyLinkedListNode<T>,
    afterIndex: number,
    root: SinglyLinkedListNode<T>,
    currentIndex: number
  ): SinglyLinkedListNode<T> {
    let currentNode = root;
    if (root === null) {
      throw new RangeError('Before key does not exist.');
    }
    if (+currentIndex === +afterIndex) {
      const newNext = root.next;
      nodeToAdd.next = newNext;
      root.next = nodeToAdd;
    } else {
      currentNode.next = this.addNodeAfter(
        nodeToAdd,
        afterIndex,
        root.next,
        ++currentIndex
      );
    }
    return currentNode;
  }

  public remove(index: number): void {
    this.validateIndex(index);
    this.first = this.removeNode(index, this.first, 0);
    if (this.first === null) {
      this.last = null;
    }
    this.size--;
  }

  private removeNode(
    index: number,
    root: SinglyLinkedListNode<T>,
    currentIndex: number
  ): SinglyLinkedListNode<T> {
    let currentNode = root;
    if (root === null) {
      throw new RangeError('Key does not exist.');
    }
    if (+index === +currentIndex) {
      currentNode = root.next;
      root.next = null;
    } else {
      root.next = this.removeNode(index, root.next, ++currentIndex);
      if (root.next === null) {
        this.last = root;
      }
    }
    return currentNode;
  }

  public forEach(callback: Function): void {
    let currentNode = this.first;
    let index = 0;
    while (currentNode !== null) {
      callback(currentNode, index);
      index++;
      currentNode = currentNode.next;
    }
  }

  private validateIndex(index: number): void {
    if (index === null || index === undefined) {
      throw new TypeError('Index is not defined.');
    }
  }
}
