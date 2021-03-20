import styled from "@emotion/styled";
import { useState } from "react";
import gsap from "gsap";

const Container = styled.div`
  position: relative;
  width: 90%;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, 0);

  transition: transform 0.6s;

  &.hidden {
    transform: translate(-50%, 300%);
  }
`;

const Bar = styled.div`
  position: absolute;
  z-index: -2;

  top: 50%;
  transform: translateY(-50%);

  width: 100%;
  height: 7px;

  background-color: rgba(222, 226, 230, 0.3);
  border-radius: 3px;
`;

const FilledBar = styled(Bar)`
  background-color: #12b886;
`;

const Timepoints = styled.ol`
  display: flex;
  align-items: center;

  padding: 0;
  margin: 0 auto;
  list-style-type: none;
`;

const Timepoint = styled.li`
  color: white;
  background-color: #495057;

  min-width: 1.6rem;
  min-height: 1.6rem;

  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:not(:first-of-type) {
    margin-left: auto;
  }

  &.passed {
    background-color: #099268;
  }
`;

interface TimelineProps {
  hidden: boolean;
  day: number;
}

export default function Timeline({ hidden, day }: TimelineProps) {
  const [from, setFrom] = useState(4);
  const showingPoints = 5;

  const percent = Math.max(0, Math.min(1, (day - from) / (showingPoints - 1)));

  return (
    <Container className={hidden ? "hidden" : ""}>
      <Bar />
      <FilledBar
        style={{
          width: Math.min(100, percent * 100) + "%",
        }}
      />
      <Timepoints>
        {Array.from({ length: showingPoints }, (_, i) => (
          <Timepoint className={from + i <= day ? "passed" : ""}>
            {from + i}
          </Timepoint>
        ))}
      </Timepoints>
    </Container>
  );
}
