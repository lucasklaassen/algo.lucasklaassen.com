import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { SinglyLinkedListComponent } from './data-structures/linked-lists/singly-linked-list/singly-linked-list.component';
import { LinkedListsComponent } from './data-structures/linked-lists/linked-lists.component';
import { DoublyLinkedListComponent } from './data-structures/linked-lists/doubly-linked-list/doubly-linked-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
