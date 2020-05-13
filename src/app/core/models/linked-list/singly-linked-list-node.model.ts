export class SinglyLinkedListNode<T> {
  data: T;
  next: SinglyLinkedListNode<T>;

  constructor(args: SinglyLinkedListNode<T>) {
    this.data = args.data;
    this.next = args.next;
  }
}
