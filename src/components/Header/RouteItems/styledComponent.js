import styled from 'styled-components'

export const ListItem = styled.li`
  background-color: transparent;
  background-color: ${props => props.isActive && '#606060'};
  background-color: ${props =>
    props.isActive && props.isDark ? '#606060' : 'transparent'};
  background: ${props => props.isActive && !props.isDark && '#cbd5e1'};
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1rem;
  @media screen and (min-width: 768px) {
    padding: 0px;
  }
`

export const IconContainer = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${props => (props.isDark ? '#909090' : '#606060')};

  color: ${props => (props.isActive ? 'red' : '')};
`

export const Para = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.isDark ? '#cccccc' : '#383838')};
  color: ${props => (props.isActive && props.isDark ? '#ffffff' : '')};
  color: ${props => (props.isActive && !props.isDark ? '#00306e' : '')};

  font-weight: ${props => (props.isActive ? '900' : '500')};
  font-size: 1rem;
`
