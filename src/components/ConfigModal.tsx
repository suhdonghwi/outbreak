import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { FaUsers, FaGlobeAmericas } from "react-icons/fa";
import Community from "../objects/Community";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: rgba(52, 58, 64, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 2rem;
  color: white;

  width: 28rem;
`;

const Title = styled.h1`
  margin: 0 0 1.2rem 0;
  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;

const SettingsGrid = styled.div`
  display: grid;

  grid-template-columns: 7rem 1fr;
  column-gap: 1rem;
  align-items: center;
`;

const SettingsName = styled.h2`
  font-weight: normal;
  font-size: 1rem;

  text-align: center;
`;

const SettingsProperty = styled.div``;

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
  color: #e9ecef;
  border: 1px dashed #e9ecef;
  border-radius: 5px;
  text-align: center;
  padding: 1.2rem;
`;

interface ConfigModalProps {
  onAddPopulation: (n: number) => void;
  selectedCommunity: Community | null;
}

export default function ConfigModal({
  onAddPopulation,
  selectedCommunity,
}: ConfigModalProps) {
  const populationNumbers = [1, 5, 10, 50, 100];

  return (
    <ModalContainer>
      <Title>
        <FaGlobeAmericas className={IconCss} />
        Environment settings
      </Title>

      <SettingsGrid>
        <SettingsName>Number of communities</SettingsName>
        <SettingsProperty>
          <p>hello</p>
        </SettingsProperty>

        <SettingsName>Add population to all</SettingsName>
        <SettingsProperty>
          {populationNumbers.map((p) => (
            <Button key={p} onClick={() => onAddPopulation(p)}>
              {p}
            </Button>
          ))}
        </SettingsProperty>
      </SettingsGrid>

      <Title>
        <FaUsers className={IconCss} />
        Community {selectedCommunity && selectedCommunity.id} settings
      </Title>
      {selectedCommunity !== null ? (
        <SettingsGrid>
          <SettingsName>Add population</SettingsName>
          <SettingsProperty>
            {populationNumbers.map((p) => (
              <Button key={p} onClick={() => onAddPopulation(p)}>
                {p}
              </Button>
            ))}
          </SettingsProperty>
        </SettingsGrid>
      ) : (
        <UnselectedBox>Click a community to configure</UnselectedBox>
      )}
    </ModalContainer>
  );
}
