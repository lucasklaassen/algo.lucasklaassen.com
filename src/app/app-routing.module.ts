import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { SinglyLinkedListComponent } from './data-structures/linked-lists/singly-linked-list/singly-linked-list.component';
import { LinkedListsComponent } from './data-structures/linked-lists/linked-lists.component';
import { DoublyLinkedListComponent } from './data-structures/linked-lists/doubly-linked-list/doubly-linked-list.component';
import { StackComponent } from './data-structures/stack/stack.component';
import { QueueComponent } from './data-structures/queue/queue.component';
import { HashTableComponent } from './data-structures/hash-table/hash-table.component';
import { BinarySearchTreeComponent } from './data-structures/binary-search-tree/binary-search-tree.component';
import { GraphComponent } from './data-structures/graph/graph.component';
import { MinHeapComponent } from './data-structures/min-heap/min-heap.component';

const routes: Routes = [
  { path: '', redirectTo: 'data-structures', pathMatch: 'full' },
  { path: 'data-structures', component: DataStructuresComponent },
  { path: 'data-structures/linked-lists', component: LinkedListsComponent },
  {
    path: 'data-structures/linked-lists/singly-linked-list',
    component: SinglyLinkedListComponent,
  },
  {
    path: 'data-structures/linked-lists/doubly-linked-list',
    component: DoublyLinkedListComponent,
  },
  { path: 'data-structures/stack', component: StackComponent },
  { path: 'data-structures/queue', component: QueueComponent },
  { path: 'data-structures/hash-table', component: HashTableComponent },
  {
    path: 'data-structures/binary-search-tree',
    component: BinarySearchTreeComponent,
  },
  {
    path: 'data-structures/graph',
    component: GraphComponent,
  },
  {
    path: 'data-structures/min-heap',
    component: MinHeapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
