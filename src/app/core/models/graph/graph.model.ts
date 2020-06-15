// undirected graph
// nodes can link to eachother
// directed graph
// node can only be linked to nodes that are not linked to them

// Verticies and Edges
// Vertex = Node of a graph
// Edge = The connection between 2 Verticies

// You can use an es6 Map to store the vertices and the edges associated to them.

export class Graph<K> {
  public rootVerticies: Array<K>;
  public verticies: Map<K, Array<K>>;
  private dfsVisited: any;

  constructor() {
    this.verticies = new Map<K, Array<K>>();
  }

  public addVertex(vertex: K): void {
    this.verticies.set(vertex, []);
  }

  public addEdge(vertex1: K, vertex2: K): void {
    let first = this.verticies.get(vertex1);
    let second = this.verticies.get(vertex2);

    if (!first) {
      throw new RangeError('Vertex 1 does not exist.');
    }

    if (!second) {
      throw new RangeError('Vertex 2 does not exist.');
    }

    first.push(vertex2);
    second.push(vertex1);
  }

  public findConnectedComponents(): void {
    this.rootVerticies = [];
    this.dfsVisited = {};
    this.verticies.forEach((_, vertex: any) => {
      if (!(vertex in this.dfsVisited)) {
        this.rootVerticies.push(vertex);
        let verticiesToMarkAsVisited = [];
        this.verticies.get(vertex).forEach((currentVertex) => {
          verticiesToMarkAsVisited.push(currentVertex);
        });
        while (verticiesToMarkAsVisited.length) {
          const currentVertex = verticiesToMarkAsVisited.pop();
          if (!(currentVertex in this.dfsVisited)) {
            if (currentVertex !== vertex) {
              this.dfsVisited[currentVertex] = true;
              this.verticies.get(currentVertex).forEach((nextVertex) => {
                verticiesToMarkAsVisited.push(nextVertex);
              });
            }
          }
        }
        this.dfsVisited[vertex] = true;
      }
    });
  }
}
