import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoublyLinkedList } from 'src/app/core/models/linked-list/doubly-linked-list.model';
import { DoublyLinkedListNode } from 'src/app/core/models/linked-list/doubly-linked-list-node.model';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-doubly-linked-list',
  templateUrl: './doubly-linked-list.component.html',
  styleUrls: ['./doubly-linked-list.component.scss'],
})
export class DoublyLinkedListComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public doublyLinkedListFormGroup: FormGroup;
  public doublyLinkedList = new DoublyLinkedList<string>();

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.doublyLinkedListFormGroup = this.formBuiler.group({
      index: this.formBuiler.control(''),
      data: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): DoublyLinkedListNode<string>[] {
    const nodes: DoublyLinkedListNode<string>[] = [];
    this.doublyLinkedList.forEach((node: DoublyLinkedListNode<string>) => {
      nodes.push(node);
    });
    return nodes;
  }

  public fetchData() {
    const index = this.doublyLinkedListFormGroup.get('index').value;
    if (!this.validatePresence(index, 'Index')) {
      return;
    }
    try {
      const node = this.doublyLinkedList.fetch(index);
      this.loggerService.log(
        'doublyLinkedList',
        `index: ${index} returned the following Data: ${node.data}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

  public insertFirst() {
    const data = this.doublyLinkedListFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    try {
      this.doublyLinkedList.addFirst(data);
      this.loggerService.log(
        'doublyLinkedList',
        `data: ${data} was added to the beginning of the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

  public insertLast() {
    const data = this.doublyLinkedListFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    try {
      this.doublyLinkedList.addLast(data);
      this.loggerService.log(
        'doublyLinkedList',
        `data: ${data} was added to the end of the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

  public insertBefore() {
    const index = this.doublyLinkedListFormGroup.get('index').value;
    const data = this.doublyLinkedListFormGroup.get('data').value;
    if (
      !this.validatePresence(index, 'Index') ||
      !this.validatePresence(data, 'Data')
    ) {
      return;
    }
    try {
      this.doublyLinkedList.addBefore(data, index);
      this.loggerService.log(
        'doublyLinkedList',
        `data: ${data} was added before index: ${index}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

  public insertAfter() {
    const index = this.doublyLinkedListFormGroup.get('index').value;
    const data = this.doublyLinkedListFormGroup.get('data').value;
    if (
      !this.validatePresence(index, 'Index') ||
      !this.validatePresence(data, 'Data')
    ) {
      return;
    }
    try {
      this.doublyLinkedList.addAfter(data, index);
      this.loggerService.log(
        'doublyLinkedList',
        `data: ${data} was added after index: ${index}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

  public remove() {
    const index = this.doublyLinkedListFormGroup.get('index').value;
    if (!this.validatePresence(index, 'Index')) {
      return;
    }
    try {
      this.doublyLinkedList.remove(index);
      this.loggerService.log(
        'doublyLinkedList',
        `index: ${index} was removed from the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.doublyLinkedListFormGroup.reset({});
  }

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
