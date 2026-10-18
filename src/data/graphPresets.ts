import { GraphNode, GraphEdge } from '../types/algorithm';

export interface GraphPreset {
  id: string;
  name: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  defaultStartNode: string;
  defaultTargetNode: string;
}

export const GRAPH_PRESETS: GraphPreset[] = [
  {
    id: 'transit-network',
    name: 'City Metro Transit Network',
    description: 'A 6-station regional transit grid with alternate loop routes and varying track distances.',
    defaultStartNode: 'A',
    defaultTargetNode: 'F',
    nodes: [
      { id: 'A', label: 'Central (A)', x: 100, y: 160 },
      { id: 'B', label: 'North Stn (B)', x: 260, y: 70 },
      { id: 'C', label: 'South Hub (C)', x: 260, y: 250 },
      { id: 'D', label: 'Tech Park (D)', x: 440, y: 70 },
      { id: 'E', label: 'Port East (E)', x: 440, y: 250 },
      { id: 'F', label: 'Airport (F)', x: 600, y: 160 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 },
      { from: 'D', to: 'F', weight: 6 },
      { from: 'E', to: 'F', weight: 3 }
    ]
  },
  {
    id: 'binary-hierarchy',
    name: 'Hierarchical Tree Graph',
    description: 'A 7-node branching network showcasing level-order tree exploration.',
    defaultStartNode: '1',
    defaultTargetNode: '7',
    nodes: [
      { id: '1', label: 'Root (1)', x: 350, y: 60 },
      { id: '2', label: 'Sub-A (2)', x: 200, y: 160 },
      { id: '3', label: 'Sub-B (3)', x: 500, y: 160 },
      { id: '4', label: 'Leaf-1 (4)', x: 120, y: 260 },
      { id: '5', label: 'Leaf-2 (5)', x: 280, y: 260 },
      { id: '6', label: 'Leaf-3 (6)', x: 420, y: 260 },
      { id: '7', label: 'Leaf-4 (7)', x: 580, y: 260 }
    ],
    edges: [
      { from: '1', to: '2', weight: 3 },
      { from: '1', to: '3', weight: 4 },
      { from: '2', to: '4', weight: 6 },
      { from: '2', to: '5', weight: 2 },
      { from: '3', to: '6', weight: 5 },
      { from: '3', to: '7', weight: 1 },
      { from: '5', to: '6', weight: 3 }
    ]
  },
  {
    id: 'mesh-cluster',
    name: 'Distributed Server Mesh',
    description: 'A 5-node interconnected cluster with redundant pathways.',
    defaultStartNode: 'S1',
    defaultTargetNode: 'S5',
    nodes: [
      { id: 'S1', label: 'Node 1', x: 140, y: 80 },
      { id: 'S2', label: 'Node 2', x: 480, y: 80 },
      { id: 'S3', label: 'Node 3', x: 540, y: 240 },
      { id: 'S4', label: 'Node 4', x: 310, y: 290 },
      { id: 'S5', label: 'Node 5', x: 100, y: 240 }
    ],
    edges: [
      { from: 'S1', to: 'S2', weight: 7 },
      { from: 'S1', to: 'S4', weight: 4 },
      { from: 'S1', to: 'S5', weight: 3 },
      { from: 'S2', to: 'S3', weight: 4 },
      { from: 'S2', to: 'S4', weight: 2 },
      { from: 'S4', to: 'S3', weight: 5 },
      { from: 'S4', to: 'S5', weight: 6 },
      { from: 'S5', to: 'S3', weight: 9 }
    ]
  }
];
