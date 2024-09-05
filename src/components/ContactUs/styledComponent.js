import styled from 'styled-components'

export const Heading = styled.h1`
  margin: 10px 0px 10px 0px;
  padding: 1px;
  color: ${props => (props.isDark ? '#f4f4f4' : '#475569')};
`

export const Para = styled.p`
  margin: 10px 0px 10px 0px;
  padding: 1px;
  color: ${props => (props.isDark ? '#f4f4f4' : '#475569')};
`
