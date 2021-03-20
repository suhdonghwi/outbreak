import { useState } from "react";
import styled from "@emotion/styled";
import { FaRegClock } from "react-icons/fa";
import { Event } from "../event";

import BlurBox from "./BlurBox";
import Button from "./Button";
import {
  Title,
  Settings,
  Property,
  PropertyName,
  PropertySetting,
} from "./Config";
import Slider from "./Slider";

const Modal = styled(BlurBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 1.7rem 2rem;
  width: 23rem;
  height: 18rem;
  overflow: auto;

  transform: translate(-50%, -50%);

  transition: opacity 0.3s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const EventSettings = styled(Settings)`
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 0.8rem;

  *:last-of-type {
    margin-left: 0.4rem;
  }

  *:first-of-type {
    margin-left: auto;
  }
`;

const UIButton = styled(Button)`
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
`;

interface EventModalProps {
  day: number | null;
  onAdd: (day: number, event: Event) => void;
  onCancel: () => void;
  defaultEvent: Event;
}

export default function EventModal({
  day,
  onAdd,
  onCancel,
  defaultEvent,
}: EventModalProps) {
  const [event, setEvent] = useState<Event>(defaultEvent);

  return (
    <Modal className={day === null ? "hidden" : ""}>
      <Title>
        <FaRegClock />
        Add event for day {day}
      </Title>
      <EventSettings>
        <Property>
          <PropertyName>
            Speed of moving people is {event.personSpeed}m/s
          </PropertyName>
          <PropertySetting>
            <Slider
              marks
              min={1}
              max={10}
              value={event.personSpeed}
              onChange={(v) => setEvent({ ...event, personSpeed: v as number })}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Disease can be spread up to {event.infectCircleRadius}m
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={100}
              value={event.infectCircleRadius}
              step={0.1}
              onChange={(v) =>
                setEvent({ ...event, infectCircleRadius: v as number })
              }
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infection probability per frame is {event.infectProbability}%
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={100}
              value={event.infectProbability}
              step={0.1}
              onChange={(v) =>
                setEvent({ ...event, infectProbability: v as number })
              }
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infected people are decided to be removed or recovered after{" "}
            {event.killTimer}s
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={10}
              value={event.killTimer}
              step={0.1}
              onChange={(v) => setEvent({ ...event, killTimer: v as number })}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            People migrate in every {event.migrateInterval}s
          </PropertyName>
          <PropertySetting>
            <Slider
              min={0.1}
              max={10}
              value={event.migrateInterval}
              step={0.1}
              onChange={(v) =>
                setEvent({ ...event, migrateInterval: v as number })
              }
            />
          </PropertySetting>
        </Property>
      </EventSettings>
      <Buttons>
        <UIButton onClick={() => onAdd(day!, event)}>Add</UIButton>
        <UIButton onClick={onCancel}>Cancel</UIButton>
      </Buttons>
    </Modal>
  );
}
