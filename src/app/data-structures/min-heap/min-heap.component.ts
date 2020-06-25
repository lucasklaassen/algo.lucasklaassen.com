import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { MinHeap } from 'src/app/core/models/min-heap/min-heap.model';

@Component({
  selector: 'app-min-heap',
  templateUrl: './min-heap.component.html',
  styleUrls: ['./min-heap.component.scss'],
})
export class MinHeapComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public minHeapFormGroup: FormGroup;
  public minHeap = new MinHeap();
  public isHidden = true;

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.minHeapFormGroup = this.formBuiler.group({
      value: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): Array<number> {
    const nodes: Array<number> = [];
    this.minHeap.forEach((node: number) => {
      nodes.push(node);
    });
    return nodes;
  }

  public peek() {
    try {
      const value = this.minHeap.peek();
      this.loggerService.log(
        'minHeap',
        `${value} is the minimum value for the heap.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.minHeapFormGroup.reset({});
  }

  public insert() {
    const value = this.minHeapFormGroup.get('value').value;
    if (!this.validatePresence(value, 'Value')) {
      return;
    }
    try {
      this.minHeap.insert(value);
      this.loggerService.log('minHeap', `${value} was added to the min heap.`);
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.minHeapFormGroup.reset({});
  }

  public poll() {
    try {
      const minValue = this.minHeap.poll();
      this.loggerService.log(
        'minHeap',
        `${minValue} was removed from the min heap.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.minHeapFormGroup.reset({});
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
