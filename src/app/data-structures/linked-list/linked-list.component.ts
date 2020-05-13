import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SinglyLinkedList } from 'src/app/core/models/linked-list/singly-linked-list.model';
import { SinglyLinkedListNode } from 'src/app/core/models/linked-list/singly-linked-list-node.model';

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.scss'],
})
export class LinkedListComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public singlyLinkedListFormGroup: FormGroup;
  public singlyLinkedList = new SinglyLinkedList<string>();

  constructor(private formBuiler: FormBuilder) {}

  ngOnInit(): void {
    this.singlyLinkedListFormGroup = this.formBuiler.group({
      index: this.formBuiler.control(''),
      data: this.formBuiler.control(''),
    });
    this.singlyLinkedListFormGroup.valueChanges.subscribe((results) => {
      console.log(results);
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): SinglyLinkedListNode<string>[] {
    const nodes: SinglyLinkedListNode<string>[] = [];
    this.singlyLinkedList.forEach((node: SinglyLinkedListNode<string>) => {
      nodes.push(node);
    });
    return nodes;
  }

  public fetchData() {
    const index = this.singlyLinkedListFormGroup.get('index').value;
    if (!this.validatePresence(index, 'Index')) {
      return;
    }
    try {
      const node = this.singlyLinkedList.fetch(index);
      this.results.push(
        `index: ${index} returned the following Data: ${node.data}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.singlyLinkedListFormGroup.reset({});
  }

  public insertFirst() {
    const data = this.singlyLinkedListFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    this.singlyLinkedList.addFirst(data);
    this.singlyLinkedListFormGroup.reset({});
  }

  public insertLast() {
    const data = this.singlyLinkedListFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    this.singlyLinkedList.addLast(data);
    this.singlyLinkedListFormGroup.reset({});
  }

  public insertBefore() {
    const index = this.singlyLinkedListFormGroup.get('index').value;
    const data = this.singlyLinkedListFormGroup.get('data').value;
    if (
      !this.validatePresence(index, 'Index') ||
      !this.validatePresence(data, 'Data')
    ) {
      return;
    }
    this.singlyLinkedList.addBefore(data, index);
    this.singlyLinkedListFormGroup.reset({});
  }

  public insertAfter() {
    const index = this.singlyLinkedListFormGroup.get('index').value;
    const data = this.singlyLinkedListFormGroup.get('data').value;
    if (
      !this.validatePresence(index, 'Index') ||
      !this.validatePresence(data, 'Data')
    ) {
      return;
    }
    this.singlyLinkedList.addAfter(data, index);
    this.singlyLinkedListFormGroup.reset({});
  }

  public remove() {}

  private validatePresence(item: string, itemType: string): boolean {
    if (!item || !item.length) {
      this.errorMessage = `${itemType} cannot be empty.`;
      return false;
    } else {
      this.errorMessage = null;
    }
    return true;
  }
}
