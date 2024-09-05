import styled from 'styled-components'

export const SideContainer = styled.div`
  height: calc(100vh - 5.5rem);
  width: 20%;
  margin: 0px;
  display: none;
  background-color: ${props => (props.isDark ? '#313131' : '#f4f4f4')};
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
  }
`

export const Dummy = styled.div`
  display: none;
`
