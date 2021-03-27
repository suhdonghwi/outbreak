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
