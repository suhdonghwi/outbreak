import styled from "@emotion/styled";

import Modal from "./Modal";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 25rem;
  height: 20rem;
`;

const Title = styled.h1`
  color: #ced4da;
  font-size: 1rem;
  font-weight: normal;
`;

export default function Dashboard() {
  return (
    <Container>
      <Modal sideComponent={<Title>Dashboard</Title>}>
        <div>Hello, world!</div>
      </Modal>
    </Container>
  );
}
