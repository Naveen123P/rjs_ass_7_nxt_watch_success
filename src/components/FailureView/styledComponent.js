import styled from 'styled-components'

export const Heading = styled.h1`
  margin: 0px;
  color: ${props => (props.isDark ? '#ffffff' : '#000000')};
`
export const Para = styled.p`
  margin: 9px;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => (props.isDark ? '#94a3b8' : '#475569')};
`
export const RetryButton = styled.button`
  border: none;
  color: #ffffff;
  background-color: blue;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem 2rem 1rem 2rem;
`
