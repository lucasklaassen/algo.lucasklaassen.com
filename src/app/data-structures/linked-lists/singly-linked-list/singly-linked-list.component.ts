import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SinglyLinkedList } from 'src/app/core/models/linked-list/singly-linked-list.model';
import { SinglyLinkedListNode } from 'src/app/core/models/linked-list/singly-linked-list-node.model';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-singly-linked-list',
  templateUrl: './singly-linked-list.component.html',
  styleUrls: ['./singly-linked-list.component.scss'],
})
export class SinglyLinkedListComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public singlyLinkedListFormGroup: FormGroup;
  public singlyLinkedList = new SinglyLinkedList<string>();

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.singlyLinkedListFormGroup = this.formBuiler.group({
      index: this.formBuiler.control(''),
      data: this.formBuiler.control(''),
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
      this.loggerService.log(
        'singlyLinkedList',
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
    try {
      this.singlyLinkedList.addFirst(data);
      this.loggerService.log(
        'singlyLinkedList',
        `data: ${data} was added to the beginning of the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.singlyLinkedListFormGroup.reset({});
  }

  public insertLast() {
    const data = this.singlyLinkedListFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    try {
      this.singlyLinkedList.addLast(data);
      this.loggerService.log(
        'singlyLinkedList',
        `data: ${data} was added to the end of the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
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
    try {
      this.singlyLinkedList.addBefore(data, index);
      this.loggerService.log(
        'singlyLinkedList',
        `data: ${data} was added before index: ${index}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
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
    try {
      this.singlyLinkedList.addAfter(data, index);
      this.loggerService.log(
        'singlyLinkedList',
        `data: ${data} was added after index: ${index}`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.singlyLinkedListFormGroup.reset({});
  }

  public remove() {
    const index = this.singlyLinkedListFormGroup.get('index').value;
    if (!this.validatePresence(index, 'Index')) {
      return;
    }
    try {
      this.singlyLinkedList.remove(index);
      this.loggerService.log(
        'singlyLinkedList',
        `index: ${index} was removed from the list.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.singlyLinkedListFormGroup.reset({});
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
