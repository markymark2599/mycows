import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const WIDTH = 400;
const HEIGHT = 800;

// Small seeded PRNG so the spots look the same on every render and device.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// An irregular closed blob: points around a circle with jittered radii,
// smoothed into cubic curves (Catmull-Rom).
function blobPath(cx: number, cy: number, r: number, rand: () => number) {
  const n = 7 + Math.floor(rand() * 4);
  const pts = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2;
    const radius = r * (0.55 + rand() * 0.6);
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.85];
  });

  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

// Spots sit on a jittered grid so coverage is even without looking tiled.
function makeSpots(seed: number) {
  const rand = mulberry32(seed);
  const cols = 3;
  const rows = 6;
  const cellW = WIDTH / cols;
  const cellH = HEIGHT / rows;
  const spots: string[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rand() < 0.15) continue;
      const offset = row % 2 ? cellW / 2 : 0;
      const cx = col * cellW + offset + (rand() - 0.5) * cellW * 0.5;
      const cy = row * cellH + cellH / 2 + (rand() - 0.5) * cellH * 0.5;
      const r = cellW * (0.4 + rand() * 0.25);
      spots.push(blobPath(cx, cy, r, rand));
    }
  }
  return spots;
}

type Props = { hide: string; spots: string; seed?: number };

export function CowPrint({ hide, spots, seed = 7 }: Props) {
  const paths = useMemo(() => makeSpots(seed), [seed]);
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width="100%"
      height="100%"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Rect width={WIDTH} height={HEIGHT} fill={hide} />
      {paths.map((d, i) => (
        <Path key={i} d={d} fill={spots} />
      ))}
    </Svg>
  );
}
