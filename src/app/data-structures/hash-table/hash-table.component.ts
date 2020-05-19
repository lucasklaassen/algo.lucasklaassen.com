import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { HashTable } from 'src/app/core/models/hash-table/hash-table.model';

@Component({
  selector: 'app-hash-table',
  templateUrl: './hash-table.component.html',
  styleUrls: ['./hash-table.component.scss'],
})
export class HashTableComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public hashTableFormGroup: FormGroup;
  public hashTable = new HashTable<string, string>();
  public isHidden = true;

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.hashTableFormGroup = this.formBuiler.group({
      key: this.formBuiler.control(''),
      value: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public nodes(): Array<{ key: string; value: string }> {
    const nodes: Array<{ key: string; value: string }> = [];
    this.hashTable.keys().forEach((key: string) => {
      nodes.push({ key, value: this.hashTable.get(key) });
    });
    return nodes;
  }

  public get() {
    const key = this.hashTableFormGroup.get('key').value;
    if (!this.validatePresence(key, 'Key')) {
      return;
    }
    try {
      const value = this.hashTable.get(key);
      this.loggerService.log(
        'hashTable',
        `${value} was retrieved from hash table for key: ${key}.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.hashTableFormGroup.reset({});
  }

  public insert() {
    const key = this.hashTableFormGroup.get('key').value;
    const value = this.hashTableFormGroup.get('value').value;
    if (
      !this.validatePresence(key, 'Key') ||
      !this.validatePresence(value, 'Value')
    ) {
      return;
    }
    try {
      this.hashTable.put(key, value);
      this.loggerService.log(
        'hashTable',
        `${key} : ${value}  was added to the hash table.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.hashTableFormGroup.reset({});
  }

  public remove() {
    const key = this.hashTableFormGroup.get('key').value;
    if (!this.validatePresence(key, 'Key')) {
      return;
    }
    try {
      this.hashTable.remove(key);
      this.loggerService.log(
        'hashTable',
        `key: ${key} was removed from the hash table.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.hashTableFormGroup.reset({});
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
