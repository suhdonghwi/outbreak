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
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 2rem;
  color: white;

  width: 28rem;
`;

const ModalTitle = styled.h1`
  margin: 0;

  display: flex;
  align-items: center;
`;

export default function ConfigModal() {
  return (
    <ModalContainer>
      <ModalTitle>
        <FaUsers
          className={css`
            margin-right: 0.75rem;
          `}
        />
        Environment settings
      </ModalTitle>
    </ModalContainer>
  );
}
