import GaugeComponent from "react-gauge-component";

export default function Gauge({ value }) {
  return (
    <GaugeComponent
      labels={{
        valueLabel: {
          style: {
            fill: "#000",
            textShadow: "none",
          },
        },
      }}
      arc={{
        emptyColor: "#e1e1e1",
        subArcs: [
          {
            limit: 50,
            color: "#f40000",
            showTick: true,
          },
          {
            limit: 80,
            color: "#f4ed00",
            showTick: true,
          },
          {
            limit: 100,
            color: "#29f400",
            showTick: true,
          },
        ],
      }}
      value={value}
    />
  );
}
