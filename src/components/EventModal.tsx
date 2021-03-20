import styled from "@emotion/styled";
import { FaRegClock } from "react-icons/fa";
import { Parameter } from "../parameter";

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
  width: 25rem;
  height: 23rem;
  overflow: auto;

  transform: translate(-50%, -50%);

  transition: opacity 0.1s;

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

  *:first-of-type {
    margin-left: auto;
  }
`;

const UIButton = styled(Button)`
  padding: 0.4rem 0.9rem;
  border-radius: 4px;

  & + & {
    margin-left: 0.4rem;
  }
`;

interface EventModalProps {
  value: Parameter;
  onChange: (e: Parameter) => void;

  day: number | null;
  onAdd: (day: number, event: Parameter) => void;
  onRemove: (day: number) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export default function EventModal({
  value,
  onChange,
  day,
  onAdd,
  onRemove,
  onCancel,
  isEdit,
}: EventModalProps) {
  return (
    <Modal className={day === null ? "hidden" : ""}>
      <Title>
        <FaRegClock />
        {isEdit ? "Edit" : "Add"} event for day {day}
      </Title>
      <EventSettings>
        <Property>
          <PropertyName>
            Randomly infect {value.randomlyInfect}{" "}
            {value.randomlyInfect <= 1 ? "person" : "people"} of population
          </PropertyName>
          <PropertySetting>
            <Slider
              min={0}
              max={100}
              value={value.randomlyInfect}
              onChange={(v) =>
                onChange({ ...value, randomlyInfect: v as number })
              }
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            People move in speed of {value.personSpeed}m/s
          </PropertyName>
          <PropertySetting>
            <Slider
              marks
              min={0.1}
              max={10}
              step={0.1}
              value={value.personSpeed}
              onChange={(v) => onChange({ ...value, personSpeed: v as number })}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Disease can be spread up to {value.infectCircleRadius}m radius
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={100}
              value={value.infectCircleRadius}
              step={0.1}
              onChange={(v) =>
                onChange({ ...value, infectCircleRadius: v as number })
              }
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infection probability per frame is {value.infectProbability}%
          </PropertyName>
          <PropertySetting>
            <Slider
              min={0.001}
              max={10}
              value={value.infectProbability}
              step={0.001}
              onChange={(v) =>
                onChange({ ...value, infectProbability: v as number })
              }
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infected people are removed after {value.killTimer}s
          </PropertyName>
          <PropertySetting>
            <Slider
              min={1}
              max={10}
              value={value.killTimer}
              step={0.1}
              onChange={(v) => onChange({ ...value, killTimer: v as number })}
            />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Migrate one person randomly every {value.migrateInterval}s
          </PropertyName>
          <PropertySetting>
            <Slider
              min={0.1}
              max={10}
              value={value.migrateInterval}
              step={0.1}
              onChange={(v) =>
                onChange({ ...value, migrateInterval: v as number })
              }
            />
          </PropertySetting>
        </Property>
      </EventSettings>
      <Buttons>
        <UIButton onClick={() => onAdd(day!, value)}>
          {isEdit ? "Edit" : "Add"}
        </UIButton>
        {isEdit && day !== 0 && (
          <UIButton onClick={() => onRemove(day!)}>Remove</UIButton>
        )}
        <UIButton onClick={onCancel}>Cancel</UIButton>
      </Buttons>
    </Modal>
  );
}
