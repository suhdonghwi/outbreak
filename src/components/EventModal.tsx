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
  value: Event;
  day: number | null;
  onCancel: () => void;
}

export default function EventModal({ value, day, onCancel }: EventModalProps) {
  return (
    <Modal className={day === null ? "hidden" : ""}>
      <Title>
        <FaRegClock />
        Add event for day {day}
      </Title>
      <EventSettings>
        <Property>
          <PropertyName>
            Speed of moving people is {value.personSpeed}m/s
          </PropertyName>
          <PropertySetting>
            <Slider marks min={1} max={10} value={value.personSpeed} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Disease can be spread up to {value.infectCircleRadius}m
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={100}
              value={value.infectCircleRadius}
              step={0.1}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infection probability per frame is {value.infectProbability}%
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={100}
              value={value.infectProbability}
              step={0.1}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infected people are decided to be removed or recovered after{" "}
            {value.killTimer}s
          </PropertyName>
          <PropertySetting>
            <Slider min={1} max={10} value={value.killTimer} step={0.1} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            People migrate in every {value.migrateInterval}s
          </PropertyName>
          <PropertySetting>
            <Slider
              min={0.1}
              max={10}
              value={value.migrateInterval}
              step={0.1}
            />
          </PropertySetting>
        </Property>
      </EventSettings>
      <Buttons>
        <UIButton>Add</UIButton>
        <UIButton onClick={onCancel}>Cancel</UIButton>
      </Buttons>
    </Modal>
  );
}
