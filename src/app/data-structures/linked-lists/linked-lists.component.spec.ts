import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedListsComponent } from './linked-lists.component';

describe('LinkedListsComponent', () => {
  let component: LinkedListsComponent;
  let fixture: ComponentFixture<LinkedListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedListsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
