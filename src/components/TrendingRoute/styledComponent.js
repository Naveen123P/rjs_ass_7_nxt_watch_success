import styled from 'styled-components'

export const TrendingBg = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  align-self: flex-start;
  height: calc(100vh - 4.4rem);
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (min-width: 768px) {
    width: 80%;
    height: calc(100vh - 6rem);
  }
`
export const TrendHeadBg = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isDark ? '#231f20' : '#ebebeb')};
`
export const TrendHeading = styled.h1`
  margin: 0px;
  color: ${props => (props.isDark ? '#ffffff' : '#1e293b')};
`
export const TrendIconBg = styled.div`
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${props => (props.isDark ? '#000000' : '#cbd5e1')};
`
