import React, { useState } from "react";
import styled from "@emotion/styled";
import BlurBox from "./BlurBox";

import { FaCaretDown } from "react-icons/fa";

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
}

export const populationNumbers = [1, 5, 10, 50, 100];

export default function Modal({ sideComponent, children }: ConfigModalProps) {
  const [collapse, setCollapse] = useState(false);

  return (
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
  );
}
