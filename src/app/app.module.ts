import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LinkedListComponent } from './data-structures/linked-list/linked-list.component';

@NgModule({
  declarations: [AppComponent, DataStructuresComponent, LinkedListComponent],
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
