import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { BinarySearchTree } from 'src/app/core/models/binary-search-tree/binary-search-tree.model';
import { BinarySearchTreeNode } from 'src/app/core/models/binary-search-tree/binary-search-tree-node.model';

@Component({
  selector: 'app-binary-search-tree',
  templateUrl: './binary-search-tree.component.html',
  styleUrls: ['./binary-search-tree.component.scss'],
})
export class BinarySearchTreeComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public binarySearchTreeFormGroup: FormGroup;
  public binarySearchTree = new BinarySearchTree<string>();
  public isHidden = true;

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.binarySearchTreeFormGroup = this.formBuiler.group({
      key: this.formBuiler.control(''),
      value: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public root(): BinarySearchTreeNode<string> {
    return this.binarySearchTree.root;
  }

  public fetch() {
    const key = this.binarySearchTreeFormGroup.get('key').value;
    if (!this.validatePresence(key, 'Key')) {
      return;
    }
    try {
      const value = this.binarySearchTree.fetch(key);
      this.loggerService.log(
        'binarySearchTree',
        `${value} was retrieved from binary search tree for key: ${key}.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.binarySearchTreeFormGroup.reset({});
  }

  public put() {
    const key = this.binarySearchTreeFormGroup.get('key').value;
    const value = this.binarySearchTreeFormGroup.get('value').value;
    if (
      !this.validatePresence(key, 'Key') ||
      !this.validatePresence(value, 'Value')
    ) {
      return;
    }
    try {
      this.binarySearchTree.put(key, value);
      this.loggerService.log(
        'binarySearchTree',
        `${key} : ${value}  was added to the binary search tree.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.binarySearchTreeFormGroup.reset({});
  }

  public remove() {
    const key = this.binarySearchTreeFormGroup.get('key').value;
    if (!this.validatePresence(key, 'Key')) {
      return;
    }
    try {
      this.binarySearchTree.remove(key);
      this.loggerService.log(
        'binarySearchTree',
        `key: ${key} was removed from the binary search tree.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.binarySearchTreeFormGroup.reset({});
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
