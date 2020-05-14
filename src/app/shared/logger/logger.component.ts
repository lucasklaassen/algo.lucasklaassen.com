import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { takeUntil } from 'rxjs/operators';
import { TDataStructure } from 'src/app/core/models/linked-list/types/data-structure.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent implements OnInit, OnDestroy {
  @Input('type') type: TDataStructure;
  public results: Array<string> = [];
  private destroy$ = new Subject<void>();

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.type === this.type) {
          switch (result.action) {
            case 'message':
              this.results.push(result.message);
              break;
            case 'clear':
              this.results = [];
              break;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearResults(): void {
    this.loggerService.clear(this.type);
  }
}
