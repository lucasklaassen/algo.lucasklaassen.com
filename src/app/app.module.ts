import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SinglyLinkedListComponent } from './data-structures/linked-lists/singly-linked-list/singly-linked-list.component';
import { LoggerComponent } from './shared/logger/logger.component';
import { LinkedListsComponent } from './data-structures/linked-lists/linked-lists.component';
import { DoublyLinkedListComponent } from './data-structures/linked-lists/doubly-linked-list/doubly-linked-list.component';
import { StackComponent } from './data-structures/stack/stack.component';
import { QueueComponent } from './data-structures/queue/queue.component';
import { HashTableComponent } from './data-structures/hash-table/hash-table.component';
import { BinaryNodeComponent } from './shared/binary-node/binary-node.component';
import { BinarySearchTreeComponent } from './data-structures/binary-search-tree/binary-search-tree.component';
import { GraphComponent } from './data-structures/graph/graph.component';
import { GraphNodeComponent } from './shared/graph-node/graph-node.component';
import { MinHeapComponent } from './data-structures/min-heap/min-heap.component';

@NgModule({
  declarations: [
    AppComponent,
    DataStructuresComponent,
    LinkedListsComponent,
    SinglyLinkedListComponent,
    DoublyLinkedListComponent,
    StackComponent,
    QueueComponent,
    HashTableComponent,
    BinarySearchTreeComponent,
    GraphComponent,
    LoggerComponent,
    BinaryNodeComponent,
    GraphNodeComponent,
    MinHeapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
