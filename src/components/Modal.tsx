import React, { useState } from "react";
import styled from "@emotion/styled";
import BlurBox from "./BlurBox";

import { FaCaretDown } from "react-icons/fa";

export const Container = styled.div`
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

export const ConfigBox = styled(BlurBox)`
  display: flex;
  flex-direction: column;

  height: 100%;

  pointer-events: all;
  transition: height 0.4s;

  &.collapse {
    height: 3rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0 1.5rem;

  *:last-child {
    margin-left: auto;
  }
`;

export const MenuButton = styled.button`
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

export const Body = styled.div`
  flex: 1;

  padding: 1.7rem 2rem;
  box-sizing: border-box;

  overflow: auto;

  transition: all 0.3s;

  &.collapse {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export interface ConfigModalProps {
  children: React.ReactNode;
  sideComponent: React.ReactNode;
  hidden: boolean;
}

export const populationNumbers = [1, 5, 10, 50, 100];

export default function Modal({
  sideComponent,
  hidden,
  children,
}: ConfigModalProps) {
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

          {sideComponent}
        </Header>
        <Body className={collapse ? "collapse" : ""}>{children}</Body>
      </ConfigBox>
    </Container>
  );
}
