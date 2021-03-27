import styled from "@emotion/styled";

import Button from "../Button";

export const UIButton = styled(Button)`
  font-size: 1rem;
  padding: 0.3rem 0.7rem;
  border-radius: 3px;

  display: inline-block;

  & + & {
    margin-left: 0.5rem;
  }
`;

export const UnselectedBox = styled.div`
  color: #ced4da;
  border: 1px dashed #ced4da;
  border-radius: 5px;
  text-align: center;
  padding: 1.2rem;
`;
