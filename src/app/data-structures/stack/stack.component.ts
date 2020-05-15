import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { Stack } from 'src/app/core/models/stack/stack.model';
import { SinglyLinkedListNode } from 'src/app/core/models/linked-list/singly-linked-list-node.model';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public stackFormGroup: FormGroup;
  public stack = new Stack<string>();
  public isHidden = true;

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.stackFormGroup = this.formBuiler.group({
      data: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): SinglyLinkedListNode<string>[] {
    const nodes: SinglyLinkedListNode<string>[] = [];
    this.stack.forEach((node: SinglyLinkedListNode<string>) => {
      nodes.push(node);
    });
    return nodes;
  }

  public peekTop() {
    try {
      const node = this.stack.peekTop();
      this.loggerService.log(
        'stack',
        `data: ${node.data} is at the top of the stack.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.stackFormGroup.reset({});
  }

  public insert() {
    const data = this.stackFormGroup.get('data').value;
    if (!this.validatePresence(data, 'Data')) {
      return;
    }
    try {
      this.stack.push(data);
      this.loggerService.log(
        'stack',
        `data: ${data} was added to the top of the stack.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.stackFormGroup.reset({});
  }

  public remove() {
    try {
      const itemFromStack = this.stack.pop();
      this.loggerService.log(
        'stack',
        `data: ${itemFromStack.data} was removed from the stack.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.stackFormGroup.reset({});
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
