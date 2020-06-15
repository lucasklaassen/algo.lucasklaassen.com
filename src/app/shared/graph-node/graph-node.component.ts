import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DrawService } from 'src/app/core/services/draw.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.scss'],
})
export class GraphNodeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('currentVertex') currentVertex: string;
  @Input('verticies') verticies: Map<string, Array<string>>;
  @Input('parentPayload') parentPayload: any;
  @Input('visitedVerticies') visitedVerticies: any;
  @ViewChild('line') line: ElementRef;
  @ViewChild('rootRef') rootRef: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawLines();
  }
  private destroy$ = new Subject<void>();
  public currentPayload: any;
  public currentVerticies: Array<string>;

  constructor(
    private renderer: Renderer2,
    private ref: ChangeDetectorRef,
    private drawService: DrawService
  ) {}

  ngOnInit(): void {
    this.drawService.events$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.currentVerticies = this.verticies
        .get(this.currentVertex)
        .filter((vertex) => !(vertex in this.visitedVerticies));
      setTimeout(() => {
        this.drawLines();
      }, 1);
    });
    this.drawService.newEvent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.drawService.newEvent();
  }

  ngAfterViewInit(): void {
    this.currentPayload = this.rootRef;
    this.ref.detectChanges();
    this.drawLines();
  }

  public getNewVisitedVerticies(vertex: string): any {
    let visited = {};
    Object.keys(this.visitedVerticies).forEach((key) => {
      visited[key] = true;
    });
    visited[vertex] = true;
    return visited;
  }

  public adjustLine(): void {
    if (this.rootRef && this.rootRef.nativeElement) {
      let fT =
        this.parentPayload.nativeElement.offsetTop +
        this.parentPayload.nativeElement.offsetHeight / 2;
      let tT =
        this.rootRef.nativeElement.offsetTop +
        this.rootRef.nativeElement.offsetHeight / 2;
      let fL =
        this.parentPayload.nativeElement.offsetLeft +
        this.parentPayload.nativeElement.offsetWidth / 2;
      let tL =
        this.rootRef.nativeElement.offsetLeft +
        this.rootRef.nativeElement.offsetWidth / 2;

      let CA = Math.abs(tT - fT);
      let CO = Math.abs(tL - fL);
      let H = Math.sqrt(CA * CA + CO * CO);
      let ANG = (180 / Math.PI) * Math.acos(CA / H);
      let top = (fT - tT) / 2 + tT;
      if (tT > fT) {
        top = (tT - fT) / 2 + fT;
      }
      let left = (fL - tL) / 2 + tL;
      if (tL > fL) {
        left = (tL - fL) / 2 + fL;
      }
      if (
        (fT < tT && fL < tL) ||
        (tT < fT && tL < fL) ||
        (fT > tT && fL > tL) ||
        (tT > fT && tL > fL)
      ) {
        ANG *= -1;
      }
      top -= H / 2;
      if (this.line) {
        this.line.nativeElement.style.top = `${top}px`;
        this.line.nativeElement.style.left = `${left}px`;
        this.line.nativeElement.style.height = `${H}px`;
        this.renderer.setStyle(
          this.line.nativeElement,
          'transform',
          `rotate(${ANG}deg)`
        );
      }
    }
  }

  private drawLines(): void {
    if (this.parentPayload && this.parentPayload.nativeElement) {
      setTimeout(() => {
        this.adjustLine();
        this.ref.detectChanges();
      }, 1);
    }
  }
}
