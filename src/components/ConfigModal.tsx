import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { FaUsers, FaGlobeAmericas, FaCaretDown } from "react-icons/fa";
import Slider from "./Slider";

import Community from "../objects/Community";

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 2%;

  height: 90%;
  width: 24rem;

  box-sizing: border-box;
  pointer-events: none;
  transform: translateY(-50%);

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

const ConfigBox = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(52, 58, 64, 0.4);
  backdrop-filter: blur(20px);

  height: 100%;
  overflow: auto;

  pointer-events: all;
  transition: height 0.4s;

  &.collapse {
    height: 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0 1.5rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
`;

const ToggleButton = styled.button`
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
  color: white;
`;

const Title = styled.h1`
  margin: 0 0 1.2rem 0;
  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  font-size: 1.5rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 420px) {
    font-size: 1.4rem;
  }
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
`;

const Property = styled.div`
  margin-bottom: 1.5rem;
`;

const PropertyName = styled.h2`
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

const PropertySetting = styled.div``;

const Button = styled.button`
  cursor: pointer;

  background-color: #343a40;
  backdrop-filter: blur(20px);
  appearance: none;
  border: none;

  font-size: 1rem;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 3px;
  border: 1px solid #495057;

  transition: background-color 0.2s;

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: #495057;
  }
`;

const IconCss = css`
  margin-right: 0.8rem;
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
}

const populationNumbers = [1, 5, 10, 50, 100];

function EnvSettings({
  communityCount,
  onChangeCommunityCount,
  onAddPopulation,
  onRemovePopulation,
}: ConfigModalProps) {
  return (
    <Settings>
      <Property>
        <PropertyName>Number of communities</PropertyName>
        <PropertySetting>
          <Slider
            marks
            min={1}
            max={25}
            value={communityCount}
            onChange={(v) => onChangeCommunityCount(v as number)}
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Add population to all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <Button key={p} onClick={() => onAddPopulation(p)}>
              {p}
            </Button>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population of all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <Button key={p} onClick={() => onRemovePopulation(p)}>
              {p}
            </Button>
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
            <Button
              key={p}
              onClick={() => onAddPopulation(p, selectedCommunity)}
            >
              {p}
            </Button>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <Button
              key={p}
              onClick={() => onRemovePopulation(p, selectedCommunity)}
            >
              {p}
            </Button>
          ))}
        </PropertySetting>
      </Property>
    </Settings>
  );
}

export default function ConfigModal(props: ConfigModalProps) {
  const { selectedCommunity } = props;
  const [collapse, setCollapse] = useState(false);

  return (
    <Container>
      <ConfigBox className={collapse ? "collapse" : ""}>
        <Header>
          <ToggleButton
            onClick={() => setCollapse((c) => !c)}
            className={collapse ? "collapse" : ""}
          >
            <FaCaretDown />
          </ToggleButton>
        </Header>
        <Body>
          <Title>
            <FaGlobeAmericas className={IconCss} />
            Environment settings
          </Title>
          <EnvSettings {...props} />

          <Title>
            <FaUsers className={IconCss} />
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
