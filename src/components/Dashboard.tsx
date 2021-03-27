import styled from "@emotion/styled";
import { ResponsiveLineCanvas } from "@nivo/line";
import { useState } from "react";
import { useDrag } from "react-use-gesture";

import Modal from "./Modal";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 30rem;
  height: 25rem;
  touch-action: none;
`;

const Title = styled.h1`
  color: #ced4da;
  font-size: 1rem;
  font-weight: normal;
`;

const graphTheme = {
  textColor: "#eee",
  fontSize: 11,
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1,
    },
  },
};

export type Datum = { x: number; y: number };
interface DashboardProps {
  susceptible: Datum[];
  infected: Datum[];
  removed: Datum[];
}

export default function Dashboard({
  susceptible,
  infected,
  removed,
}: DashboardProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const bind = useDrag(({ down, delta: [dx, dy] }) => {
    if (down) {
      setX((x) => x + dx);
      setY((y) => y + dy);
    }
  });

  return (
    <Container {...bind()} style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Modal sideComponent={<Title>Dashboard</Title>}>
        <ResponsiveLineCanvas
          data={[
            { id: "Susceptible", data: susceptible },
            { id: "Infected", data: infected },
            { id: "Removed", data: removed },
          ]}
          colors={{ scheme: "nivo" }}
          enableGridX={false}
          enablePoints={false}
          enableSlices="x"
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              itemWidth: 100,
              itemHeight: 20,
              translateX: 115,
            },
          ]}
          xFormat=">-.2f"
          margin={{ right: 100, bottom: 25 }}
          theme={graphTheme}
          xScale={{ type: "linear" }}
          axisBottom={{
            format: ">-.2f",
            tickValues: 4,
          }}
        />
      </Modal>
    </Container>
  );
}
