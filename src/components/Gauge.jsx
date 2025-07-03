import * as React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

// This pointer can be reused in any gauge
function GaugePointer({ color = "blue", strokeWidth = 3, radius = 5 }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) return null;

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={color} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </g>
  );
}

/**
 * A reusable Gauge component with a pointer.
 *
 * Props:
 * - value: number (required)
 * - min: number (default 0)
 * - max: number (default 100)
 * - width: number (default 200)
 * - height: number (default 200)
 * - startAngle: number (default -110)
 * - endAngle: number (default 110)
 * - pointerColor: string (default "red")
 */
export default function Gauge({
  value,
  min = 0,
  max = 100,
  width = 200,
  height = 200,
  startAngle = -110,
  endAngle = 110,
}) {
  return (
    <GaugeContainer
      width={width}
      height={height}
      startAngle={startAngle}
      endAngle={endAngle}
      value={value}
      min={min}
      max={max}
      sx={{
        backgroundColor: "#f7f7f7",
        borderRadius: 2,
        padding: 2,
        "& path.css-b9rdri-MuiGauge-referenceArc": {
          stroke: "f7f7f7",
          fill: value < 60 ? "red" : "green",
        },
      }}>
      <GaugeReferenceArc />
      <GaugeValueArc
      // Dynamically set color based on value
      />
      <GaugePointer />
    </GaugeContainer>
  );
}
