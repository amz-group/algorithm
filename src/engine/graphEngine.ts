import { AlgorithmId, ExecutionResult, GraphNode, GraphEdge, GraphStep } from '../types/algorithm';

export function runGraphAlgorithm(
  algorithmId: AlgorithmId,
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  targetNodeId: string
): ExecutionResult {
  const startTime = performance.now();
  const steps: GraphStep[] = [];
  let comparisons = 0;
  let operations = 0;

  // Build adjacency list (undirected graph representation for routing)
  const adj = new Map<string, { node: string; weight: number }[]>();
  nodes.forEach(n => adj.set(n.id, []));

  for (const edge of edges) {
    const wt = edge.weight !== undefined ? edge.weight : 1;
    adj.get(edge.from)?.push({ node: edge.to, weight: wt });
    adj.get(edge.to)?.push({ node: edge.from, weight: wt });
  }

  if (algorithmId === 'bfs') {
    const visited = new Set<string>();
    const queue: string[] = [startNodeId];
    visited.add(startNodeId);
    const traversalOrder: string[] = [];
    const predecessors = new Map<string, string | null>();
    predecessors.set(startNodeId, null);

    steps.push({
      stepIndex: 0,
      activeNode: startNodeId,
      visitedNodes: [startNodeId],
      queueState: [...queue],
      operation: 'BFS Initialization',
      description: `Enqueued start node ${startNodeId}. Marked as visited. Queue initialized to [${queue.join(', ')}].`,
      decision: `Begin FIFO level-order traversal from ${startNodeId}.`,
      valuesExamined: `Start Node: ${startNodeId}`,
      beforeState: `Unvisited nodes`,
      afterState: `Queue: [${queue.join(', ')}]`
    });

    let stepCount = steps.length;

    while (queue.length > 0) {
      operations++;
      const current = queue.shift()!;
      traversalOrder.push(current);

      steps.push({
        stepIndex: stepCount++,
        activeNode: current,
        visitedNodes: Array.from(visited),
        queueState: [...queue],
        operation: `Dequeue Node ${current}`,
        description: `Dequeued node ${current} from front of queue. Exploring all immediate unvisited neighbors.`,
        decision: `Processing node ${current}.`,
        valuesExamined: `Current: ${current}, Queue remaining: [${queue.join(', ')}]`,
        beforeState: `Node in queue`,
        afterState: `Processed ${current}`
      });

      if (current === targetNodeId) {
        steps.push({
          stepIndex: stepCount++,
          activeNode: current,
          visitedNodes: Array.from(visited),
          queueState: [...queue],
          operation: `Target Node ${current} Reached`,
          description: `Target node ${targetNodeId} has been reached during breadth-first traversal!`,
          decision: `Target located in level-order search.`,
          valuesExamined: `Target: ${targetNodeId}`,
          beforeState: `Searching`,
          afterState: `Target found`
        });
        // We can either terminate or explore full component; let's terminate at target if target specified
        break;
      }

      const neighbors = adj.get(current) || [];
      for (const edge of neighbors) {
        comparisons++;
        const neighbor = edge.node;
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          predecessors.set(neighbor, current);

          steps.push({
            stepIndex: stepCount++,
            activeNode: current,
            visitedNodes: Array.from(visited),
            queueState: [...queue],
            activeEdge: { from: current, to: neighbor },
            operation: `Discover Neighbor ${neighbor}`,
            description: `Neighbor ${neighbor} is unvisited. Marked visited and enqueued into FIFO queue.`,
            decision: `Enqueue ${neighbor}. Predecessor is ${current}.`,
            valuesExamined: `Edge (${current} -> ${neighbor})`,
            beforeState: `Queue: [${queue.slice(0, -1).join(', ')}]`,
            afterState: `Queue: [${queue.join(', ')}]`
          });
        }
      }
    }

    // Reconstruct path to target if reached
    let shortestPath: string[] = [];
    if (visited.has(targetNodeId)) {
      let curr: string | null = targetNodeId;
      while (curr !== null) {
        shortestPath.unshift(curr);
        curr = predecessors.get(curr) || null;
      }
    }

    steps.push({
      stepIndex: steps.length,
      activeNode: targetNodeId,
      visitedNodes: Array.from(visited),
      queueState: [...queue],
      shortestPath,
      operation: 'BFS Complete',
      description: `BFS completed with ${traversalOrder.length} nodes visited. Traversal order: ${traversalOrder.join(' → ')}. ${shortestPath.length ? `Shortest path (hops): ${shortestPath.join(' → ')}` : ''}`,
      decision: 'All reachable vertices within exploration bound traversed.',
      valuesExamined: `Total visited: ${visited.size}`,
      beforeState: 'Active BFS',
      afterState: 'Traversal finished'
    });

    const endTime = performance.now();
    return {
      algorithmId,
      algorithmName: 'Breadth-First Search (BFS)',
      executionTimeMs: Number((endTime - startTime).toFixed(3)),
      totalSteps: steps.length,
      comparisonsCount: comparisons,
      swapsCount: operations,
      startNode: startNodeId,
      targetNode: targetNodeId,
      traversalOrder,
      shortestPath,
      shortestDistance: shortestPath.length > 0 ? shortestPath.length - 1 : 0,
      visitedCount: visited.size,
      steps
    };
  } else {
    // Dijkstra's Shortest Path
    // Validate negative edge weights
    const hasNegative = edges.some(e => (e.weight !== undefined && e.weight < 0));
    if (hasNegative) {
      throw new Error(
        "Dijkstra's Algorithm cannot run with negative edge weights. Negative weights violate the greedy choice property, as a future negative edge could reduce an already finalized shortest distance. Use Bellman-Ford for negative edge weights."
      );
    }

    const distances: { [nodeId: string]: number } = {};
    const predecessors: { [nodeId: string]: string | null } = {};
    const unvisited = new Set<string>();

    nodes.forEach(n => {
      distances[n.id] = Infinity;
      predecessors[n.id] = null;
      unvisited.add(n.id);
    });

    distances[startNodeId] = 0;

    steps.push({
      stepIndex: 0,
      activeNode: startNodeId,
      visitedNodes: [],
      distances: { ...distances },
      predecessors: { ...predecessors },
      operation: 'Dijkstra Initialization',
      description: `Initialized source ${startNodeId} distance to 0, all other ${nodes.length - 1} vertices to ∞. All nodes unvisited.`,
      decision: `Tentative distance Dist[${startNodeId}] = 0.`,
      valuesExamined: `Start Node: ${startNodeId}`,
      beforeState: `All distances ∞`,
      afterState: `Dist[${startNodeId}] = 0`
    });

    let stepCount = steps.length;
    const visitedNodesList: string[] = [];

    while (unvisited.size > 0) {
      operations++;
      // Select unvisited node with smallest distance
      let minNode: string | null = null;
      let minDistance = Infinity;

      for (const node of unvisited) {
        comparisons++;
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          minNode = node;
        }
      }

      if (!minNode || minDistance === Infinity) {
        // Remaining unvisited nodes are unreachable from start
        break;
      }

      unvisited.delete(minNode);
      visitedNodesList.push(minNode);

      steps.push({
        stepIndex: stepCount++,
        activeNode: minNode,
        visitedNodes: [...visitedNodesList],
        distances: { ...distances },
        predecessors: { ...predecessors },
        operation: `Finalize Node ${minNode}`,
        description: `Selected node ${minNode} with minimum tentative distance ${minDistance}. Node is finalized (visited).`,
        decision: `Dist[${minNode}] is finalized at ${minDistance}.`,
        valuesExamined: `Node: ${minNode}, Final Distance: ${minDistance}`,
        beforeState: `Unvisited candidate`,
        afterState: `Finalized`
      });

      if (minNode === targetNodeId) {
        steps.push({
          stepIndex: stepCount++,
          activeNode: minNode,
          visitedNodes: [...visitedNodesList],
          distances: { ...distances },
          predecessors: { ...predecessors },
          operation: `Target Node Finalized`,
          description: `Target node ${targetNodeId} shortest distance finalized at ${distances[targetNodeId]}.`,
          decision: `Optimal path to target locked.`,
          valuesExamined: `Target: ${targetNodeId}, Shortest Dist: ${distances[targetNodeId]}`,
          beforeState: `Scanning`,
          afterState: `Target finalized`
        });
        break;
      }

      // Relax unvisited neighbors
      const neighbors = adj.get(minNode) || [];
      for (const edge of neighbors) {
        if (!unvisited.has(edge.node)) continue;
        comparisons++;
        const neighbor = edge.node;
        const weight = edge.weight;
        const candidateDist = distances[minNode] + weight;
        const prevDist = distances[neighbor];

        if (candidateDist < prevDist) {
          distances[neighbor] = candidateDist;
          predecessors[neighbor] = minNode;

          steps.push({
            stepIndex: stepCount++,
            activeNode: minNode,
            visitedNodes: [...visitedNodesList],
            distances: { ...distances },
            predecessors: { ...predecessors },
            activeEdge: { from: minNode, to: neighbor },
            operation: `Relax Edge (${minNode} → ${neighbor})`,
            description: `Dist[${minNode}] (${minDistance}) + Weight (${weight}) = ${candidateDist} < Dist[${neighbor}] (${prevDist === Infinity ? '∞' : prevDist}). Updated Dist[${neighbor}] = ${candidateDist}. Predecessor set to ${minNode}.`,
            decision: `Relaxation successful: shorter path found to ${neighbor}.`,
            valuesExamined: `Edge weight: ${weight}, Previous: ${prevDist === Infinity ? '∞' : prevDist}, New: ${candidateDist}`,
            beforeState: `Dist[${neighbor}] = ${prevDist === Infinity ? '∞' : prevDist}`,
            afterState: `Dist[${neighbor}] = ${candidateDist}`
          });
        }
      }
    }

    // Reconstruct shortest path
    const shortestPath: string[] = [];
    if (distances[targetNodeId] !== Infinity) {
      let curr: string | null = targetNodeId;
      while (curr !== null) {
        shortestPath.unshift(curr);
        curr = predecessors[curr] || null;
      }
    }

    steps.push({
      stepIndex: steps.length,
      activeNode: targetNodeId,
      visitedNodes: [...visitedNodesList],
      distances: { ...distances },
      predecessors: { ...predecessors },
      shortestPath,
      operation: 'Dijkstra Completed',
      description: `Shortest path search finalized. Path: ${shortestPath.join(' → ')} with total distance = ${distances[targetNodeId]}.`,
      decision: `Reconstructed path from target ${targetNodeId} back to start ${startNodeId}.`,
      valuesExamined: `Total path weight = ${distances[targetNodeId]}`,
      beforeState: 'Relaxation complete',
      afterState: `Shortest distance = ${distances[targetNodeId]}`
    });

    const endTime = performance.now();
    return {
      algorithmId,
      algorithmName: "Dijkstra's Shortest Path",
      executionTimeMs: Number((endTime - startTime).toFixed(3)),
      totalSteps: steps.length,
      comparisonsCount: comparisons,
      swapsCount: operations,
      startNode: startNodeId,
      targetNode: targetNodeId,
      shortestPath,
      shortestDistance: distances[targetNodeId] !== Infinity ? distances[targetNodeId] : -1,
      visitedCount: visitedNodesList.length,
      steps
    };
  }
}
