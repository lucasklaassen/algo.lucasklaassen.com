import { SinglyLinkedList } from '../linked-list/singly-linked-list.model';
import { SinglyLinkedListNode } from '../linked-list/singly-linked-list-node.model';

interface KeyValue<K, V> {
  key: K;
  value: V;
}

export class HashTable<K, V> {
  private data: SinglyLinkedList<KeyValue<K, V>>[];
  private size: number;

  constructor(args?: HashTable<K, V>) {
    this.data = (args && args.data) || new Array(5);
    this.size = 0;
  }

  public put(key: K, value: V): void {
    this.insertItem(key, value);
    this.resizeArray();
  }

  public get(key: K): V {
    let result = null;
    const index = this.hashCodeToIndex(key);
    if (!this.data[index]) {
      throw new RangeError('Key does not exist.');
    } else {
      this.data[index].forEach((item: SinglyLinkedListNode<KeyValue<K, V>>) => {
        if (item.data.key === key) {
          result = item.data.value;
        }
      });
    }
    return result;
  }

  public remove(key: K): void {
    const index = this.hashCodeToIndex(key);
    if (!this.data[index]) {
      throw new RangeError('Key does not exist.');
    } else {
      let indexToDelete = 0;
      this.data[index].forEach((item, currentIndex) => {
        if (item.key === key) {
          indexToDelete = currentIndex;
        }
      });
      this.data[index].remove(indexToDelete);
      this.size--;
    }
    this.resizeArray();
  }

  public keys(): Array<K> {
    const keys: Array<K> = [];
    this.data.forEach((item: SinglyLinkedList<KeyValue<K, V>>) => {
      if (item) {
        item.forEach((subItem: SinglyLinkedListNode<KeyValue<K, V>>) => {
          if (subItem.data.key) {
            keys.push(subItem.data.key);
          }
        });
      }
    });
    return keys;
  }

  private resizeArray(): void {
    const previousData: SinglyLinkedList<KeyValue<K, V>>[] = this.data;
    let resize = false;
    if (this.size === this.data.length) {
      this.data = new Array(this.data.length * 2);
      this.size = 0;
      resize = true;
    } else if (this.size / this.data.length <= 0.25) {
      this.data = new Array(Math.ceil(this.data.length / 2));
      this.size = 0;
      resize = true;
    }
    if (resize) {
      previousData.forEach((item: SinglyLinkedList<KeyValue<K, V>>) => {
        if (item) {
          item.forEach((subItem: SinglyLinkedListNode<KeyValue<K, V>>) => {
            this.insertItem(subItem.data.key, subItem.data.value);
          });
        }
      });
    }
  }

  private hashCode(key: K): number {
    let hash = 0;
    for (var i = 0; i < String(key).length; i++) {
      const character = String(key).charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  private hashCodeToIndex(key: K): number {
    return this.hashCode(key) % this.data.length;
  }

  private insertItem(key: K, value: V): void {
    const index = this.hashCodeToIndex(key);
    if (this.data[index]) {
      let itemFound = false;
      this.data[index].forEach((item: SinglyLinkedListNode<KeyValue<K, V>>) => {
        if (item.data.key === key) {
          item.data.value = value;
          itemFound = true;
        }
      });
      if (!itemFound) {
        this.data[index].addLast({ key, value });
        this.size++;
      }
    } else {
      this.data[index] = new SinglyLinkedList<KeyValue<K, V>>();
      this.data[index].addFirst({
        key,
        value,
      });
      this.size++;
    }
  }
}
