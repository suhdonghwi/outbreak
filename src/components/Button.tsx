import styled from "@emotion/styled";

export default styled.button`
  cursor: pointer;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  appearance: none;

  color: white;
  background-color: #343a40;
  border: 1px solid #495057;

  transition: background-color 0.2s;

  &:hover {
    background-color: #495057;
  }
`;
