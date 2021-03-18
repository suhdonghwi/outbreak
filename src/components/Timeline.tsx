import styled from "@emotion/styled";
import BlurBox from "./BlurBox";

const Container = styled(BlurBox)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);

  width: 95%;
  height: 3rem;

  transition: all 0.7s;

  &.hidden {
    bottom: 0;
    transform: translate(-50%, 100%);
  }
`;

interface TimelineProps {
  hidden: boolean;
}

export default function Timeline({ hidden }: TimelineProps) {
  return (
    <Container className={hidden ? "hidden" : ""}>Hello, world!</Container>
  );
}
