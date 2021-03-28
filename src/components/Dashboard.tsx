import styled from "@emotion/styled";
import { ResponsiveLineCanvas } from "@nivo/line";

import Modal from "./Modal";

const Container = styled.div`
  cursor: grab;

  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 30rem;
  height: 25rem;

  transition: opacity 0.3s;
  pointer-events: none;

  &.hidden {
    opacity: 0;

    * {
      pointer-events: none;
    }
  }

  @media screen and (max-width: 600px) {
    width: 25rem;
    height: 20rem;
  }

  @media screen and (max-width: 400px) {
    width: 20rem;
    height: 18rem;
  }
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
  hidden: boolean;
}

export default function Dashboard({
  susceptible,
  infected,
  removed,
  hidden,
}: DashboardProps) {
  return (
    <Container className={hidden ? "hidden" : ""}>
      <Modal draggable sideComponent={<Title>Dashboard</Title>}>
        <ResponsiveLineCanvas
          data={[
            { id: "Susceptible", data: susceptible },
            { id: "Infected", data: infected },
            { id: "Removed", data: removed },
          ]}
          colors={{ scheme: "nivo" }}
          curve="monotoneY"
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
          xScale={{ type: "linear" }}
          margin={{ left: 30, right: 95, top: 20, bottom: 25 }}
          theme={graphTheme}
          axisBottom={{
            format: ">-.2f",
            tickValues: 4,
          }}
          axisLeft={{
            tickValues: 4,
          }}
        />
      </Modal>
    </Container>
  );
}
