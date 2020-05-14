export class DoublyLinkedListNode<T> {
  data: T;
  next: DoublyLinkedListNode<T>;
  prev: DoublyLinkedListNode<T>;

  constructor(args: DoublyLinkedListNode<T>) {
    this.data = args.data;
    this.next = args.next;
    this.prev = args.prev;
  }
}
