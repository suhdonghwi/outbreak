import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { FaUsers } from "react-icons/fa";

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
  margin: 0 0 1.5rem 0;

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

export default function ConfigModal() {
  return (
    <ModalContainer>
      <Title>
        <FaUsers
          className={css`
            margin-right: 0.8rem;
          `}
        />
        Environment settings
      </Title>

      <SettingsGrid>
        <SettingsName>Number of communities</SettingsName>
        <SettingsProperty>
          <p>hello</p>
        </SettingsProperty>

        <SettingsName>Add population</SettingsName>
        <SettingsProperty>
          <Button>1</Button>
          <Button>5</Button>
          <Button>10</Button>
          <Button>50</Button>
          <Button>100</Button>
        </SettingsProperty>
      </SettingsGrid>
    </ModalContainer>
  );
}
