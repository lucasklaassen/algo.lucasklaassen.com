import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DrawService {
  private events: Subject<string> = new Subject<string>();
  public events$: Observable<string> = this.events.asObservable();

  constructor() {}

  public newEvent(): void {
    this.events.next('');
  }
}
