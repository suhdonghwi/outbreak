import React, { useState } from "react";
import styled from "@emotion/styled";

import {
  FaUsers,
  FaGlobeAmericas,
  FaCaretDown,
  FaArrowRight,
} from "react-icons/fa";
import Slider from "./Slider";

import Community from "../objects/Community";
import BlurBox from "./BlurBox";
import {
  Title,
  Settings,
  Property,
  PropertyName,
  PropertySetting,
} from "./Config";
import Button from "./Button";

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 2%;

  height: 90%;
  width: 24rem;

  box-sizing: border-box;
  pointer-events: none;

  transform: translateY(-50%);
  transition: all 0.5s;

  &.hidden {
    right: 0;
    transform: translate(100%, -50%);

    pointer-events: none;
  }

  @media screen and (max-width: 534px) {
    right: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 95%;
  }

  @media screen and (max-width: 420px) {
    width: 90%;
  }
`;

const ConfigBox = styled(BlurBox)`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow: auto;

  pointer-events: all;
  transition: height 0.4s;

  &.collapse {
    height: 3rem;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0 1.5rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.18);

  *:last-child {
    margin-left: auto;
  }
`;

const MenuButton = styled.button`
  cursor: pointer;

  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;

  color: #868e96;
  font-size: 1.4rem;
  outline: none;

  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: white;
  }

  &.collapse {
    transform: rotateZ(-90deg);
  }
`;

const Body = styled.div`
  flex: 1;

  padding: 1.7rem 2rem;
  box-sizing: border-box;
`;

const UIButton = styled(Button)`
  font-size: 1rem;
  padding: 0.3rem 0.7rem;
  border-radius: 3px;

  display: inline-block;

  & + & {
    margin-left: 0.5rem;
  }
`;

const UnselectedBox = styled.div`
  color: #ced4da;
  border: 1px dashed #ced4da;
  border-radius: 5px;
  text-align: center;
  padding: 1.2rem;
`;

interface ConfigModalProps {
  onAddPopulation: (n: number, c?: Community) => void;
  onRemovePopulation: (n: number, c?: Community) => void;

  selectedCommunity: Community | null;
  communityCount: number;
  onChangeCommunityCount: (n: number) => void;

  defaultCommunitySize: number;
  onChangeDefaultCommunitySize: (n: number) => void;

  onFinish: () => void;
  hidden: boolean;
}

const populationNumbers = [1, 5, 10, 50, 100];

function EnvSettings({
  communityCount,
  onChangeCommunityCount,
  defaultCommunitySize,
  onChangeDefaultCommunitySize,
  onAddPopulation,
  onRemovePopulation,
}: ConfigModalProps) {
  return (
    <Settings>
      <Property>
        <PropertyName>Number of communities</PropertyName>
        <PropertySetting>
          <Slider
            min={1}
            max={49}
            value={communityCount}
            onChange={(v) => onChangeCommunityCount(v as number)}
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Default size of communities</PropertyName>
        <PropertySetting>
          <Slider
            min={150}
            max={1500}
            value={defaultCommunitySize}
            onChange={(v) => onChangeDefaultCommunitySize(v as number)}
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Add population to all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton key={p} onClick={() => onAddPopulation(p)}>
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population of all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton key={p} onClick={() => onRemovePopulation(p)}>
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>
    </Settings>
  );
}

function CommunitySettings({
  onAddPopulation,
  onRemovePopulation,
  selectedCommunity,
}: ConfigModalProps) {
  if (selectedCommunity === null) return null;

  return (
    <Settings>
      <Property>
        <PropertyName>Add population</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton
              key={p}
              onClick={() => onAddPopulation(p, selectedCommunity)}
            >
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton
              key={p}
              onClick={() => onRemovePopulation(p, selectedCommunity)}
            >
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>
    </Settings>
  );
}

export default function ConfigModal(props: ConfigModalProps) {
  const { selectedCommunity, onFinish, hidden } = props;
  const [collapse, setCollapse] = useState(false);

  return (
    <Container className={hidden ? "hidden" : ""}>
      <ConfigBox className={collapse ? "collapse" : ""}>
        <Header>
          <MenuButton
            onClick={() => setCollapse((c) => !c)}
            className={collapse ? "collapse" : ""}
          >
            <FaCaretDown />
          </MenuButton>

          <MenuButton style={{ fontSize: "1.1rem" }} onClick={onFinish}>
            Next
            <FaArrowRight style={{ marginLeft: "0.4rem" }} />
          </MenuButton>
        </Header>
        <Body>
          <Title>
            <FaGlobeAmericas />
            Environment settings
          </Title>
          <EnvSettings {...props} />

          <Title>
            <FaUsers />
            Community {selectedCommunity && selectedCommunity.id} settings
          </Title>
          {selectedCommunity !== null ? (
            <CommunitySettings {...props} />
          ) : (
            <UnselectedBox>Click a community to configure</UnselectedBox>
          )}
        </Body>
      </ConfigBox>
    </Container>
  );
}
