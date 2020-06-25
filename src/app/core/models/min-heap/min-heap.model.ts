export class MinHeap {
  private heap: Array<number> = [];

  constructor() {}

  public length(): number {
    return this.heap.length;
  }

  public peek(): number {
    if (this.heap.length === 0) {
      throw new RangeError('There are no items in this min heap.');
    }
    return this.heap[0];
  }

  public poll(): number {
    if (this.heap.length === 0) {
      throw new RangeError('There are no items in this min heap.');
    }
    const minItem = this.heap[0];
    if (this.heap.length === 1) {
      return this.heap.shift();
    }
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();
    return minItem;
  }

  public insert(newNumber: number): void {
    this.heap.push(newNumber);
    this.heapifyUp();
  }

  public forEach(callback: Function): void {
    this.heap.forEach((item) => callback(item));
  }

  private heapifyDown(): void {
    let currentParent = 0;
    while (this.hasLeftChild(currentParent)) {
      let smallestIndex = this.getLeftChildIndex(currentParent);
      if (
        +this.heap[smallestIndex] >
        +this.heap[this.getRightChildIndex(currentParent)]
      ) {
        smallestIndex = this.getRightChildIndex(currentParent);
      }
      if (+this.heap[currentParent] > +this.heap[smallestIndex]) {
        this.swap(currentParent, smallestIndex);
      }
      currentParent = smallestIndex;
    }
  }

  private heapifyUp(): void {
    let currentIndex = this.heap.length - 1;
    while (this.hasParent(currentIndex)) {
      let parentIndex = this.getParentIndex(currentIndex);
      if (+this.heap[parentIndex] > +this.heap[currentIndex]) {
        this.swap(parentIndex, currentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }
}
