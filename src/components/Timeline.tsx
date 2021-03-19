import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  width: 90%;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);

  transition: transform 0.6s;

  &.hidden {
    transform: translate(-50%, 200%);
  }
`;

const Bar = styled.div`
  position: absolute;
  z-index: -1;

  top: 50%;
  transform: translateY(-50%);

  width: 100%;
  height: 7px;

  background-color: rgba(222, 226, 230, 0.3);
  border-radius: 3px;
  backdrop-filter: blur(20px);
`;

const Timepoints = styled.ol`
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: 0;
  margin: 0 auto;
  list-style-type: none;
`;

const Timepoint = styled.li`
  color: white;
  background-color: #495057;

  min-width: 1.6rem;
  min-height: 1.6rem;

  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.9rem;

  &:not(:first-of-type) {
    margin-left: auto;
  }

  &:not(:last-of-type) {
    margin-right: 10rem;
  }
`;

interface TimelineProps {
  hidden: boolean;
}

export default function Timeline({ hidden }: TimelineProps) {
  const l = [];
  for (let i = 0; i < 10; i++) l.push(i);

  return (
    <Container className={hidden ? "hidden" : ""}>
      <Bar />
      <Timepoints>
        {l.map((c) => (
          <Timepoint>{c}</Timepoint>
        ))}
      </Timepoints>
    </Container>
  );
}
