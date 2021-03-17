import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { FaUsers, FaGlobeAmericas } from "react-icons/fa";
import Slider from "./Slider";

import Community from "../objects/Community";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);

  background: rgba(52, 58, 64, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 2.5rem;
  box-sizing: border-box;
  color: white;

  width: 24rem;
  height: 90%;
  overflow: auto;

  @media screen and (max-width: 534px) {
    right: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 420px) {
    width: 19rem;
    padding: 1.7rem;
  }
`;

const Title = styled.h1`
  margin: 0 0 1.2rem 0;
  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  font-size: 1.6rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 420px) {
    font-size: 1.3rem;
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

  & + & {
    margin-left: 0.5rem;
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

export default function ConfigModal({
  onAddPopulation,
  onRemovePopulation,
  selectedCommunity,
  communityCount,
  onChangeCommunityCount,
}: ConfigModalProps) {
  const populationNumbers = [1, 5, 10, 50, 100];

  return (
    <ModalContainer>
      <Title>
        <FaGlobeAmericas className={IconCss} />
        Environment settings
      </Title>
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

      <Title>
        <FaUsers className={IconCss} />
        Community {selectedCommunity && selectedCommunity.id} settings
      </Title>
      {selectedCommunity !== null ? (
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
      ) : (
        <UnselectedBox>Click a community to configure</UnselectedBox>
      )}
    </ModalContainer>
  );
}
