import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaPlay,
  FaPlus,
  FaRedo,
  FaRegCalendar,
} from "react-icons/fa";

const Container = styled.div`
  position: relative;
  width: 90%;
  bottom: 120px;
  left: 50%;
  transform: translate(-50%, 0);

  transition: transform 0.6s;

  &.hidden {
    transform: translate(-50%, 300%);
  }
`;

const Buttons = styled.ul`
  display: flex;

  list-style-type: none;
  padding: 0;
  margin: 0 0 1.3rem 0;
`;

const ControlButton = styled.button`
  cursor: pointer;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  appearance: none;

  color: white;
  background-color: #343a40;

  width: 2rem;
  height: 2rem;
  border-radius: 10px;

  transition: background-color 0.2s;

  & + & {
    margin-left: 0.6rem;
  }

  &:hover {
    background-color: #495057;
  }
`;

const BarContainer = styled.div`
  position: relative;
`;

const Bar = styled.div`
  position: absolute;
  z-index: -2;

  top: 50%;
  transform: translateY(-50%);

  width: 100%;
  height: 9px;

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

  min-width: 1.8rem;
  min-height: 1.8rem;

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
  const [from, setFrom] = useState(0);
  const showingPoints = 5;

  const percent = Math.max(0, Math.min(1, (day - from) / (showingPoints - 1)));
  if (percent >= 1) {
    setFrom(from + showingPoints - 1);
  }

  return (
    <Container className={hidden ? "hidden" : ""}>
      <Buttons>
        <ControlButton style={{ marginRight: "0.7rem" }}>
          <FaPlay />
        </ControlButton>

        <ControlButton
          onClick={() => setFrom(Math.max(0, from - (showingPoints - 1)))}
        >
          <FaArrowLeft />
        </ControlButton>

        <ControlButton onClick={() => setFrom(from + (showingPoints - 1))}>
          <FaArrowRight />
        </ControlButton>

        <ControlButton>
          <FaPlus />
        </ControlButton>
      </Buttons>
      <BarContainer>
        <Bar />
        <FilledBar
          style={{
            width: Math.min(100, percent * 100) + "%",
          }}
        />
        <Timepoints>
          {Array.from({ length: showingPoints }, (_, i) => (
            <Timepoint key={i} className={from + i <= day ? "passed" : ""}>
              {from + i}
            </Timepoint>
          ))}
        </Timepoints>
      </BarContainer>
    </Container>
  );
}
