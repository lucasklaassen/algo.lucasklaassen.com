import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { LinkedListComponent } from './data-structures/linked-list/linked-list.component';

const routes: Routes = [
  { path: 'data-structures', component: DataStructuresComponent },
  { path: 'data-structures/linked-list', component: LinkedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
