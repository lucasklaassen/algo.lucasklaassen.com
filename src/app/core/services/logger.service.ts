import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TDataStructure } from '../models/linked-list/types/data-structure.model';
import { TAction } from '../models/linked-list/types/actions.model';

interface Payload {
  action: TAction;
  type: TDataStructure;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private messages: Subject<Payload> = new Subject<Payload>();
  public messages$: Observable<Payload> = this.messages.asObservable();

  constructor() {}

  public log(type: TDataStructure, message: string): void {
    this.messages.next({ type, message, action: 'message' });
  }

  public clear(type: TDataStructure): void {
    this.messages.next({ type, action: 'clear' });
  }
}
