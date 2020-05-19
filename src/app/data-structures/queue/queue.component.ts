import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { SinglyLinkedListNode } from 'src/app/core/models/linked-list/singly-linked-list-node.model';
import { Queue } from 'src/app/core/models/queue/queue.model';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public queueFormGroup: FormGroup;
  public queue = new Queue<string>();
  public isHidden = true;

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.queueFormGroup = this.formBuiler.group({
      data: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): SinglyLinkedListNode<string>[] {
    const nodes: SinglyLinkedListNode<string>[] = [];
    this.queue.forEach((node: SinglyLinkedListNode<string>) => {
      nodes.push(node);
    });
    return nodes;
  }

  public peek() {
    try {
      const node = this.queue.peek();
      this.loggerService.log(
        'queue',
        `data: ${node.data} is at the front of the queue.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.queueFormGroup.reset({});
  }

  public enqueue() {
    const data = this.queueFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    try {
      this.queue.enqueue(data);
      this.loggerService.log(
        'queue',
        `data: ${data} was added to the back of the queue.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.queueFormGroup.reset({});
  }

  public dequeue() {
    try {
      const itemFromQueue = this.queue.dequeue();
      this.loggerService.log(
        'queue',
        `data: ${itemFromQueue.data} was removed from the queue.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.queueFormGroup.reset({});
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
