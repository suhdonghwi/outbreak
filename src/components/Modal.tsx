import React, { useState } from "react";

import { FaCaretDown } from "react-icons/fa";

import { Body, ConfigBox, Container, Header, MenuButton } from "./styles";

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
