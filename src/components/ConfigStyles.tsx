import styled from "@emotion/styled";

export const Title = styled.h1`
  margin: 0 0 1.2rem 0;
  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: white;

  @media screen and (max-width: 420px) {
    font-size: 1.4rem;
  }

  svg {
    margin-right: 0.6rem;
  }
`;

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const Property = styled.div`
  margin-bottom: 1.5rem;
`;

export const PropertyName = styled.h2`
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

export const PropertySetting = styled.div``;
