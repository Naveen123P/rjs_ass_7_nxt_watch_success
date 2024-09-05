import styled from 'styled-components'

export const ListItem = styled.li`
  background-color: transparent
  background-color: ${props =>
    props.isActive && props.isDark ? '#606060' : 'transparent'};
  background: ${props => (props.isActive && !props.isDark ? '#cbd5e1' : '')};
  background-color: ${props => props.isDark};
  width: 50%;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 1rem;
  @media screen and (min-width: 576px){
    width: 33%;
  }
  
`
export const dummy = styled.p``
