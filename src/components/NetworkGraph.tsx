"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Node {
  id: number;
  x: number;
  y: number;
  baseRadius: number;
  type: 0 | 1 | 2;
  z: number;
  targetOpacity: number;
  currentOpacity: number;
  birthTime: number;
  pulseFreq: number;
  pulsePhase: number;
  degree: number;
  fading: boolean;
  subgraphId: number;
}

interface Edge {
  id: number;
  fromId: number;
  toId: number;
  opacity: number;
  width: number;
  birthTime: number;
  drawDuration: number;
  avgZ: number;
}

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  time: number;
  prevTimestamp: number;
  growthAccum: number;
  nextInterval: number;
  nextNodeId: number;
  nextEdgeId: number;
  width: number;
  height: number;
  seedCount: number;
  frontier: number[];           // FIFO queue of node IDs eligible to sprout
  failCounts: Map<number, number>; // placement failures per frontier node
  bridgeCounter: number;        // counts spawns to trigger bridging
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_NODES = 70;
const SUBGRAPH_THRESHOLD = 15;  // independent growth per subgraph before cross-connect
const GRID_COLS = 16;
const GRID_ROWS = 12;
const BG_COLOR = "#FFFFFF";
const NODE_COLORS = [
  "6, 78, 59",    // forest #064E3B
  "245, 158, 11", // amber-500
  "4, 110, 78",   // forest lighter
] as const;
const EDGE_COLOR = "6, 78, 59";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rand(min: number, max: number) { return min + Math.random() * (max - min); }
function randInt(min: number, max: number) { return Math.floor(rand(min, max + 0.999)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function getCellIndex(x: number, y: number, w: number, h: number): number {
  const col = Math.floor(clamp(x / w, 0, 0.9999) * GRID_COLS);
  const row = Math.floor(clamp(y / h, 0, 0.9999) * GRID_ROWS);
  return row * GRID_COLS + col;
}

function buildCellMap(nodes: Node[], w: number, h: number): Map<number, number> {
  const map = new Map<number, number>();
  for (const n of nodes) {
    if (!n.fading) {
      const cell = getCellIndex(n.x, n.y, w, h);
      map.set(cell, (map.get(cell) || 0) + 1);
    }
  }
  return map;
}

// Score 8 evenly-spaced candidate angles; 70% bias toward least-occupied cell
function pickGrowthAngle(
  parent: Node, dist: number,
  cells: Map<number, number>, w: number, h: number
): number {
  const candidates = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 + rand(-Math.PI / 16, Math.PI / 16);
    const cx = parent.x + Math.cos(angle) * dist;
    const cy = parent.y + Math.sin(angle) * dist;
    const occ = cells.get(getCellIndex(cx, cy, w, h)) || 0;
    return { angle, occ };
  });

  if (Math.random() < 0.9) {
    const minOcc = Math.min(...candidates.map(c => c.occ));
    const best = candidates.filter(c => c.occ <= minOcc);
    return best[Math.floor(Math.random() * best.length)].angle;
  }
  return candidates[Math.floor(Math.random() * candidates.length)].angle;
}

function makeNode(
  id: number, x: number, y: number, z: number,
  subgraphId: number, time: number
): Node {
  return {
    id, x, y,
    baseRadius: rand(6, 26),
    type: randInt(0, 2) as 0 | 1 | 2,
    z,
    targetOpacity: lerp(0.2, 0.72, z),
    currentOpacity: 0,
    birthTime: time,
    pulseFreq: rand(0.0004, 0.0009),
    pulsePhase: rand(0, Math.PI * 2),
    degree: 0,
    fading: false,
    subgraphId,
  };
}

function makeEdge(
  id: number, fromId: number, toId: number,
  avgZ: number, time: number
): Edge {
  return {
    id, fromId, toId,
    opacity: lerp(0.07, 0.30, avgZ),
    width: lerp(0.5, 1.8, avgZ),
    birthTime: time,
    drawDuration: rand(400, 650),
    avgZ,
  };
}

// Weighted: lower-degree nodes are preferred as parents
function pickParent(pool: Node[]): Node {
  const weights = pool.map(n => 1 / (n.degree + 1));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

// Place seeds near corners so subgraphs start at opposite ends of the canvas
function getSeedPositions(count: number, w: number, h: number): [number, number][] {
  const pad = 0.18;
  const anchors: [number, number][] = [
    [w * pad,       h * pad],
    [w * (1 - pad), h * (1 - pad)],
    [w * (1 - pad), h * pad],
    [w * pad,       h * (1 - pad)],
  ];
  return anchors.slice(0, count).map(([ax, ay]) => [
    clamp(ax + rand(-w * 0.04, w * 0.04), w * 0.05, w * 0.95),
    clamp(ay + rand(-h * 0.04, h * 0.04), h * 0.05, h * 0.95),
  ]);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GraphState>({
    nodes: [], edges: [],
    time: 0, prevTimestamp: 0,
    growthAccum: 0,
    nextInterval: rand(800, 1400),
    nextNodeId: 0, nextEdgeId: 0,
    width: 0, height: 0,
    seedCount: 0,
    frontier: [],
    failCounts: new Map(),
    bridgeCounter: 0,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const s = stateRef.current;

    // ── Canvas sizing ─────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !container) return;
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = container.getBoundingClientRect();
      s.width = width;
      s.height = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // ── Seed origin nodes near corners ────────────────────────────────────
    const count = randInt(2, 3);
    s.seedCount = count;
    const positions = getSeedPositions(count, s.width, s.height);
    for (let i = 0; i < count; i++) {
      const [sx, sy] = positions[i];
      const z = rand(0.6, 1.0);
      const node = makeNode(s.nextNodeId++, sx, sy, z, i, 0);
      node.currentOpacity = node.targetOpacity;
      s.nodes.push(node);
      s.frontier.push(node.id);
    }

    // ── Bridge: connect closest cross-subgraph pair with a single edge ────
    function tryBridge() {
      const active = s.nodes.filter(n => !n.fading);
      let bestDist = Infinity;
      let bestA: Node | null = null, bestB: Node | null = null;

      for (let i = 0; i < active.length; i++) {
        for (let j = i + 1; j < active.length; j++) {
          const a = active[i], b = active[j];
          if (a.subgraphId === b.subgraphId) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) continue; // Fix 2: enforce minimum bridge distance
          if (dist < bestDist) { bestDist = dist; bestA = a; bestB = b; }
        }
      }

      if (bestA && bestB) {
        const alreadyLinked = s.edges.some(
          e => (e.fromId === bestA!.id && e.toId === bestB!.id) ||
               (e.fromId === bestB!.id && e.toId === bestA!.id)
        );
        if (!alreadyLinked) {
          s.edges.push(makeEdge(s.nextEdgeId++, bestA.id, bestB.id, (bestA.z + bestB.z) / 2, s.time));
          bestA.degree++;
          bestB.degree++;
        }
      }
    }

    // ── Spawn logic ───────────────────────────────────────────────────────
    function trySpawn() {
      if (!s.nodes.length) return;

      // At cap: mark oldest leaf as fading
      if (s.nodes.length >= MAX_NODES) {
        const leaf = s.nodes
          .filter(n => n.degree <= 1 && !n.fading)
          .sort((a, b) => a.birthTime - b.birthTime)[0];
        if (leaf) leaf.fading = true;
        return;
      }

      // Every 8th spawn (once past 25 nodes): bridge instead of growing (Fix 4)
      s.bridgeCounter++;
      if (s.nodes.length > 25 && s.bridgeCounter % 8 === 0) {
        tryBridge();
        return;
      }

      // Evict saturated or stuck nodes from frontier (Fix 3)
      s.frontier = s.frontier.filter(id => {
        const n = s.nodes.find(node => node.id === id);
        if (!n || n.fading || n.degree >= 3) return false;
        if ((s.failCounts.get(id) || 0) >= 3) return false;
        return true;
      });

      // Subgraph independence: grow smallest subgraph until it hits threshold
      const subCounts = new Map<number, number>();
      for (const n of s.nodes) {
        if (!n.fading) subCounts.set(n.subgraphId, (subCounts.get(n.subgraphId) || 0) + 1);
      }
      const smallIds = [...subCounts.entries()]
        .filter(([, c]) => c < SUBGRAPH_THRESHOLD)
        .map(([id]) => id);

      let parent: Node | null = null;

      if (smallIds.length > 0) {
        // Pick the subgraph with fewest nodes and grow its frontier first
        const targetId = smallIds.reduce((a, b) =>
          (subCounts.get(a) || 0) <= (subCounts.get(b) || 0) ? a : b
        );
        const subFrontier = s.frontier
          .map(id => s.nodes.find(n => n.id === id))
          .filter((n): n is Node => !!n && n.subgraphId === targetId);

        if (subFrontier.length > 0 && Math.random() < 0.8) {
          parent = subFrontier[0]; // FIFO oldest frontier node in this subgraph
        } else {
          const pool = s.nodes.filter(n => !n.fading && n.subgraphId === targetId);
          if (pool.length) parent = pickParent(pool);
        }
      } else {
        // All subgraphs mature — frontier-first globally (80%), random (20%) (Fix 3)
        if (s.frontier.length > 0 && Math.random() < 0.8) {
          parent = s.nodes.find(n => n.id === s.frontier[0] && !n.fading) || null;
        }
        if (!parent) {
          const pool = s.nodes.filter(n => !n.fading);
          if (pool.length) parent = pickParent(pool);
        }
      }

      if (!parent) return;

      // Build occupancy map and attempt placement with empty-space bias (Fix 1)
      const cells = buildCellMap(s.nodes, s.width, s.height);
      let placed = false;

      for (let attempt = 0; attempt < 8; attempt++) {
        const dist = Math.random() < 0.2 ? rand(30, 80) : rand(100, 280);
        const angle = pickGrowthAngle(parent, dist, cells, s.width, s.height);
        const cx = parent.x + Math.cos(angle) * dist;
        const cy = parent.y + Math.sin(angle) * dist;

        if (cx < 20 || cx > s.width - 20 || cy < 20 || cy > s.height - 20) continue;

        const tooClose = s.nodes.some(n => {
          const dx = n.x - cx, dy = n.y - cy;
          return dx * dx + dy * dy < 55 * 55;
        });
        if (tooClose) continue;

        const childZ = clamp(parent.z + rand(-0.2, 0.2), 0.1, 1.0);
        const node = makeNode(s.nextNodeId++, cx, cy, childZ, parent.subgraphId, s.time);
        const edge = makeEdge(s.nextEdgeId++, parent.id, node.id, (parent.z + childZ) / 2, s.time);
        parent.degree++;
        node.degree = 1;
        s.nodes.push(node);
        s.edges.push(edge);
        s.frontier.push(node.id);
        placed = true;
        break;
      }

      if (!placed) {
        s.failCounts.set(parent.id, (s.failCounts.get(parent.id) || 0) + 1);
      }
    }

    // ── RAF draw loop ─────────────────────────────────────────────────────
    function draw(timestamp: number) {
      const dt = s.prevTimestamp ? Math.min(timestamp - s.prevTimestamp, 50) : 16;
      s.prevTimestamp = timestamp;
      s.time += dt;

      s.growthAccum += dt;
      if (s.growthAccum >= s.nextInterval) {
        trySpawn();
        s.growthAccum = 0;
        s.nextInterval = rand(500, 1000);
      }

      // Animate node opacities; collect removed ids
      const removedIds = new Set<number>();
      s.nodes = s.nodes.filter(n => {
        if (n.fading) {
          n.currentOpacity = Math.max(0, n.currentOpacity - dt / 600);
          if (n.currentOpacity <= 0) { removedIds.add(n.id); return false; }
        } else {
          n.currentOpacity = Math.min(
            n.targetOpacity,
            n.currentOpacity + (dt / 400) * n.targetOpacity
          );
        }
        return true;
      });

      if (removedIds.size > 0) {
        s.edges.forEach(e => {
          if (removedIds.has(e.fromId) || removedIds.has(e.toId)) {
            const keepId = removedIds.has(e.fromId) ? e.toId : e.fromId;
            const neighbor = s.nodes.find(n => n.id === keepId);
            if (neighbor) neighbor.degree = Math.max(0, neighbor.degree - 1);
          }
        });
        s.edges = s.edges.filter(e => !removedIds.has(e.fromId) && !removedIds.has(e.toId));
      }

      // ── Draw ─────────────────────────────────────────────────────────────
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, s.width, s.height);

      const nodeById = new Map<number, Node>(s.nodes.map(n => [n.id, n]));

      // Back-to-front by z-depth
      const sortedEdges = [...s.edges].sort((a, b) => a.avgZ - b.avgZ);
      const sortedNodes = [...s.nodes].sort((a, b) => a.z - b.z);

      // Edges: straight lines drawn progressively
      for (const edge of sortedEdges) {
        const progress = clamp((s.time - edge.birthTime) / edge.drawDuration, 0, 1);
        if (progress <= 0) continue;

        const fn = nodeById.get(edge.fromId);
        const tn = nodeById.get(edge.toId);
        if (!fn || !tn) continue;

        const fadeFactor = (fn.fading || tn.fading)
          ? Math.min(
              fn.currentOpacity / (fn.targetOpacity || 0.01),
              tn.currentOpacity / (tn.targetOpacity || 0.01)
            )
          : 1;

        const ex = progress >= 0.999 ? tn.x : lerp(fn.x, tn.x, progress);
        const ey = progress >= 0.999 ? tn.y : lerp(fn.y, tn.y, progress);

        ctx.beginPath();
        ctx.moveTo(fn.x, fn.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(${EDGE_COLOR}, ${edge.opacity * fadeFactor})`;
        ctx.lineWidth = edge.width;
        ctx.stroke();
      }

      // Nodes: fixed position, subtle opacity pulse
      for (const n of sortedNodes) {
        if (n.currentOpacity <= 0.01) continue;
        const pulse = 0.85 + 0.15 * Math.sin(s.time * n.pulseFreq + n.pulsePhase);
        const r = n.baseRadius * (0.5 + 0.5 * n.z);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLORS[n.type]}, ${n.currentOpacity * pulse})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
