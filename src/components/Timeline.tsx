import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPause,
  FaPlay,
  FaPlus,
  FaRedo,
} from "react-icons/fa";
import defaultEvent, { Event, EventTimeline } from "../event";
import Button from "./Button";
import EventModal from "./EventModal";

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

const ControlButton = styled(Button)`
  width: 2rem;
  height: 2rem;
  border-radius: 10px;

  & + & {
    margin-left: 0.6rem;
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
  cursor: pointer;

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

  &:hover {
    background-color: #868e96;
  }

  &.passed {
    background-color: #099268;
  }
`;

interface TimelineProps {
  hidden: boolean;
  day: number;
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export default function Timeline({
  hidden,
  day,
  playing,
  onToggle,
  onReset,
}: TimelineProps) {
  const [from, setFrom] = useState(0);
  const [currentModalDay, setCurrentModalDay] = useState<number | null>(null);
  const [timeline, setTimeline] = useState<EventTimeline>({});

  const showingPoints = 7;
  const percent = Math.max(0, Math.min(1, (day - from) / (showingPoints - 1)));
  if (percent >= 1) {
    setFrom(from + showingPoints - 1);
  }

  function onClickTimepoint(day: number) {
    setCurrentModalDay(day);
  }

  function onCancelModal() {
    setCurrentModalDay(null);
  }

  function onAddModal(day: number, event: Event) {
    setTimeline({ ...timeline, [day]: event });
    setCurrentModalDay(null);
  }

  return (
    <>
      <EventModal
        defaultEvent={defaultEvent}
        day={currentModalDay}
        onCancel={onCancelModal}
        onAdd={onAddModal}
      />
      <Container className={hidden ? "hidden" : ""}>
        <Buttons>
          <ControlButton onClick={onToggle}>
            {playing ? <FaPause /> : <FaPlay />}
          </ControlButton>
          <ControlButton style={{ marginRight: "0.7rem" }} onClick={onReset}>
            <FaRedo />
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
              <Timepoint
                key={i}
                className={from + i <= day ? "passed" : ""}
                onClick={() => onClickTimepoint(from + i)}
              >
                {from + i}
                {timeline[from + i] !== undefined && "*"}
              </Timepoint>
            ))}
          </Timepoints>
        </BarContainer>
      </Container>
    </>
  );
}
