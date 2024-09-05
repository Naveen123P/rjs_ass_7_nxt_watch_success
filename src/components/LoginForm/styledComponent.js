import styled from 'styled-components'

export const LoginBg = styled.div`
  height: 100vh;
  background-color: ${props => (props.isDark ? '#313131' : '#909090')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

export const LoginContainer = styled.div`
  background-color: ${props => (props.isDark ? '#000000' : '#f4f4f4')};
  width: 100%;
  padding: 2rem 1rem 2rem 1rem;
  border-radius: 1rem;
  box-shadow: 5px #606060;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
`
export const LoginButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 100%;
  color: #ffffff;
  background-color: rgb(64, 64, 218);
  font-size: 1rem;
  font-weight: 600;
  padding-top: 0.5rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
`

export const Label = styled.label`
  color: ${props => (props.isDark ? '#f4f4f4' : '#7e858e')};
  font-weight: bold;
`
export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  background-color: transparent;
  margin-top: 5px;
  padding-left: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${props => (props.isDark ? '#f4f4f4' : '#7e858e')};
  :focus {
    background-color: #ffffff;
  }
  background-color: ${props => (props.isEmpty ? '' : '#f4f4f4')};
`
export const CLabel = styled.label`
  display: inline;
  color: ${props => (props.isDark ? '#f4f4f4' : '#000000')};
  font-weight: 500;
`
