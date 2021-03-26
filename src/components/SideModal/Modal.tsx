import React, { useState } from "react";

import { FaCaretDown, FaArrowRight } from "react-icons/fa";

import { Body, ConfigBox, Container, Header, MenuButton } from "./styles";

export interface ConfigModalProps {
  children: React.ReactNode;
  onNext: () => void;
  hidden: boolean;
}

export const populationNumbers = [1, 5, 10, 50, 100];

export default function Modal({ onNext, hidden, children }: ConfigModalProps) {
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

          <MenuButton style={{ fontSize: "1.1rem" }} onClick={onNext}>
            Next
            <FaArrowRight style={{ marginLeft: "0.4rem" }} />
          </MenuButton>
        </Header>
        <Body className={collapse ? "collapse" : ""}>{children}</Body>
      </ConfigBox>
    </Container>
  );
}
