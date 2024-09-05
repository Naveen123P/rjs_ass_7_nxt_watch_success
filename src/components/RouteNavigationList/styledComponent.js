import styled from 'styled-components'

export const NavModelBg = styled.div`
  background-color: ${props => (props.isDark ? '#313131' : '#f4f4f4')};
  padding: 2rem 0rem 2rem 0rem;
  @media screen and (min-width: 768px) {
    padding: 0px;
  }
`
export const UnList = styled.ul`
  list-style-type: none;
  padding: 0px;
`
