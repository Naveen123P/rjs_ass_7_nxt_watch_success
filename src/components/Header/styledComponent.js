import styled from 'styled-components'

export const HeaderBg = styled.div`
  background-color: ${props => (props.isDark ? '#313131' : '#f4f4f4')};
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    padding: 1.5rem 3rem 1.5rem 3rem;
  }
`

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 8rem;
  color: ${props => (props.isDark ? '#f4f4f4' : '#313131')};
  @media screen and (min-width: 768px) {
    min-width: 12rem;
  }
`
export const Button = styled.button`
  color: ${props => (props.isDark ? '#f4f4f4' : '#313131')};
  border: none;
  background-color: transparent;
  font-size: 2rem;
  margin: 0em;
  padding: 0%;
`
export const MobileButton = styled.button`
  color: ${props => (props.isDark ? '#f4f4f4' : '#313131')};
  border: none;
  background-color: transparent;
  font-size: 2rem;
  margin: 0em;
  padding: 0%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const DesktopButton = styled.button`
  display: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: ${props => (props.isDark ? '#ffffff' : '#3b82f6')};
  border-color: ${props => (props.isDark ? '#ffffff' : '#3b82f6')};
  @media screen and (min-width: 768px) {
    display: inline;
  }
`

export const LogoutModelBg = styled.div`
  background-color: ${props => (props.isDark ? '#313131' : '#f4f4f4')};
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Para = styled.p`
  color: ${props => (props.isDark ? '#f4f4f4' : '#313131')};
`
export const ConformButton = styled.button`
  border: none;
  color: white;
  margin-left: 5px;
  padding: 5px;
  background-color: blue;
`
export const CancelButton = styled.button`
  color: ${props => (props.isDark ? '#f4f4f4' : '#313131')};
  background-color: transparent;
  padding: 5px;
`
