import styled from "@emotion/styled";
import { FaRegClock } from "react-icons/fa";

import BlurBox from "./BlurBox";
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
`;

const EventSettings = styled(Settings)`
  display: flex;
`;

export default function EventModal() {
  return (
    <Modal>
      <Title>
        <FaRegClock />
        Add event
      </Title>
      <EventSettings>
        <Property>
          <PropertyName>People move in ... m/s</PropertyName>
          <PropertySetting>
            <Slider marks min={1} max={10} value={1} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>Disease can be spread to maximum ...m</PropertyName>
          <PropertySetting>
            <Slider min={1} max={10} value={1} step={0.1} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>Infection probability per frame is ...%</PropertyName>
          <PropertySetting>
            <Slider min={1} max={100} value={1} step={0.1} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>
            Infected people are decided to be removed or recovered after ...
            seconds
          </PropertyName>
          <PropertySetting>
            <Slider min={1} max={10} value={1} step={0.1} />
          </PropertySetting>
        </Property>
        <Property>
          <PropertyName>People migrate in every ... seconds</PropertyName>
          <PropertySetting>
            <Slider min={1} max={10} value={1} step={0.1} />
          </PropertySetting>
        </Property>
      </EventSettings>
    </Modal>
  );
}
