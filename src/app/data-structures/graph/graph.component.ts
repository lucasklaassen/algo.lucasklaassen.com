import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger.service';
import { Graph } from 'src/app/core/models/graph/graph.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  public errorMessage: string;
  public results: Array<string> = [];
  public graphFormGroup: FormGroup;
  public graph = new Graph<string>();
  public isHidden = true;
  public visitedVerticies = {};

  constructor(
    private formBuiler: FormBuilder,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.graphFormGroup = this.formBuiler.group({
      vertex: this.formBuiler.control(''),
      vertex2: this.formBuiler.control(''),
    });
  }

  public clearResults(): void {
    this.results = [];
  }

  public visitedVerticiesFor(vertex: string): any {
    let visited = {};
    visited[vertex] = true;
    return visited;
  }

  public rootVerticies(): Array<string> {
    this.graph.findConnectedComponents();
    return this.graph.rootVerticies;
  }

  public display(): void {
    this.graph.findConnectedComponents();
    // Find all connected components
    // Loop through each connected component on front end
    // Starting with a "root" node -> display other nodes who are connected to it (remove itself from it's children)
  }

  public addVertex(): void {
    const vertex = this.graphFormGroup.get('vertex').value;
    if (!this.validatePresence(vertex, 'Vertex')) {
      return;
    }
    try {
      this.graph.addVertex(vertex);
      this.loggerService.log('graph', `${vertex} was added to the graph.`);
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.graphFormGroup.reset({});
  }

  public addEdge(): void {
    const vertex = this.graphFormGroup.get('vertex').value;
    const vertex2 = this.graphFormGroup.get('vertex2').value;
    if (
      !this.validatePresence(vertex, 'Vertex') ||
      !this.validatePresence(vertex2, 'Vertex 2')
    ) {
      return;
    }
    try {
      this.graph.addEdge(vertex, vertex2);
      this.loggerService.log(
        'graph',
        `Edge between: ${vertex} and ${vertex2} was added to the graph.`
      );
    } catch (error) {
      this.errorMessage = error.message;
    }
    this.graphFormGroup.reset({});
  }

  private validatePresence(item: string, itemType: string): boolean {
    if (!item || !item.length) {
      this.errorMessage = `${itemType} cannot be empty.`;
      return false;
    } else {
      this.errorMessage = null;
    }
    return true;
  }
}
