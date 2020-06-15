export class Graph<K> {
  public rootVerticies: Array<K>;
  public verticies: Map<K, Array<K>>;
  private ccVisited: any;
  private dfsVisited: any;
  private dfsVerticies: Array<K>;
  private bfsVisited: any;
  private bfsVerticies: Array<K>;

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
    this.ccVisited = {};
    this.verticies.forEach((_, vertex: any) => {
      if (!(vertex in this.ccVisited)) {
        this.rootVerticies.push(vertex);
        let verticiesToMarkAsVisited = [];
        this.verticies.get(vertex).forEach((currentVertex) => {
          verticiesToMarkAsVisited.push(currentVertex);
        });
        while (verticiesToMarkAsVisited.length) {
          const currentVertex = verticiesToMarkAsVisited.pop();
          if (!(currentVertex in this.ccVisited)) {
            if (currentVertex !== vertex) {
              this.ccVisited[currentVertex] = true;
              this.verticies.get(currentVertex).forEach((nextVertex) => {
                verticiesToMarkAsVisited.push(nextVertex);
              });
            }
          }
        }
        this.ccVisited[vertex] = true;
      }
    });
  }

  public bfs(vertex: K): any {
    this.bfsVisited = {};
    this.bfsVerticies = [];
    let queue = [];
    queue.unshift(vertex);

    while (queue.length) {
      const currentVertex = queue.pop();
      if (!(currentVertex in this.bfsVisited)) {
        this.bfsVisited[currentVertex] = true;
        this.bfsVerticies.push(currentVertex);
        const neighbours = this.verticies.get(currentVertex);
        neighbours.forEach((nextVertex: any) => {
          queue.unshift(nextVertex);
        });
      }
    }

    return this.bfsVerticies;
  }

  public dfs(vertex: K): any {
    this.dfsVisited = {};
    this.dfsVerticies = [];
    this._dfs(vertex, this.dfsVisited);
    return this.dfsVerticies;
  }

  private _dfs(vertex: K, visited: any): void {
    visited[vertex] = true;
    this.dfsVerticies.push(vertex);
    const neighbours = this.verticies.get(vertex);

    neighbours.forEach((neighbour: any) => {
      if (!(neighbour in visited)) {
        this._dfs(neighbour, visited);
      }
    });
  }
}
