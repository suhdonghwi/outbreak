import styled from "@emotion/styled";

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: rgba(73, 80, 87, 0.25);
  box-shadow: 0 8px 32px 0 #212529;
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  width: 500px;
  height: 300px;

  padding: 1rem;
  color: white;
`;

export default function ConfigModal() {
  return <Modal>Hello, world!</Modal>;
}
