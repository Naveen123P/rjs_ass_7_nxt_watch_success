import styled from 'styled-components'

export const VideoItem = styled.li`
  width: 100%;

  @media screen and (min-width: 576px) {
    width: 50%;
    padding: 0.4rem;
    margin-bottom: 3rem;
  }
  @media screen and (min-width: 768px) {
    width: 33%;
  }
`
export const Title = styled.p`
  color: ${props => (props.isDark ? '#f4f4f4' : '#383838')};
  font-size: 1rem;
  font-weight: 500;
  align-self: flex-start;
  margin: 0px;
  padding: 0px;
`
