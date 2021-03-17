import styled from "@emotion/styled";

import ReactSlider from "react-slider";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 7px;
`;

const StyledThumb = styled.div`
  bottom: -10px;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background: #343a40;
  border: 1px solid #495057;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 50%;
  outline: none;
  cursor: grab;
`;

const Thumb = (props: any, state: { valueNow: number }) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: #495057;
  opacity: 0.7;
  border-radius: 999px;
`;

const Track = (props: any, state: { index: number }) => (
  <StyledTrack {...props} index={state.index} />
);

export default function Slider(props: ReactSlider.ReactSliderProps) {
  return <StyledSlider renderThumb={Thumb} renderTrack={Track} {...props} />;
}
