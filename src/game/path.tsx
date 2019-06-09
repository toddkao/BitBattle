import Point from './interfaces/point';

const INT_MAX = 2147483647;

class Node {
  x: number;
  y: number;
  cost: number;
  processed: boolean;
  constructor(n : Node | undefined) {
    if (n) {
      this.x = n.x;
      this.y = n.y;
      this.cost = n.cost;
      this.processed = n.processed;
    }
    else {
      this.x = 0;
      this.y = 0;
      this.cost = INT_MAX;
      this.processed = false;
    }
  }
}

export default class Path {
  static deltas: Point[] = [
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y : -1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y : -1 },
  ];

  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }


  search(src: Point, dst: Point, isValid: Function, path: Point[]) : boolean {
    if (!isValid(src) || !isValid(dst)) {
      return false;
    }

    let nodes : Node[][] = new Array(this.height);
    for (let y = 0; y< this.height; y++) {
      nodes[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        nodes[y][x] = new Node(undefined);
      }
    }
    
    let start = new Node(undefined);
    start.x = src.x;
    start.y = src.y;
    start.cost = 1;
    start.processed = false;

    let found : boolean = false;
    let queue : Node[] = [ start ];
    while (queue.length > 0) {
      let p : Node | undefined = queue.shift();
      if (!p) break;
      if (p.x == dst.x && p.y == dst.y) {
        found = true;
        break;
      }
      for (let i = 0; i < Path.deltas.length; i++) {
        let nc = { x: p.x + Path.deltas[i].x, y: p.y + Path.deltas[i].y };
        if (isValid(nc)) {
          let cost = p.cost + 1;
          let node = nodes[nc.y][nc.x];

          if (cost < node.cost) {
            node.cost = cost;
            node.x = p.x;
            node.y = p.y;
          }
          if (!node.processed) {
            node.processed = true;

            let nn = new Node(undefined);
            nn.x = nc.x;
            nn.y = nc.y;
            nn.cost = cost;
            nn.processed = false;
            queue.unshift(nn);
          }
        }
      }
    }

    if (!found) return false;

    let c = { x: dst.x, y: dst.y };
    while (c.x != src.x || c.y != src.y) {
      path.unshift(c);
      let n: Node = nodes[c.y][c.x];
      c = { x: n.x, y: n.y };
    }
    path.unshift({ x: src.x, y: src.y });

    return true;
  }
}