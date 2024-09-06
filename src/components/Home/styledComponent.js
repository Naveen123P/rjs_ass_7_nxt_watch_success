import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
`

export const ContentBg = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')}
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
export const SearchInputContainer = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`
export const SearchInput = styled.input`
  height: 2rem;
  padding-left: 1rem;
  font-size: 1rem;
  border: 2px solid ${props => (props.isDark ? '#606060' : '#cbd5e1')};
  color: ${props => (props.isDark ? '#ffffff' : '#000000')};
  width: calc(100% - 4rem);
  background-color: transparent;
  :focus {
    outline: none;
  }
`
export const SearchButton = styled.button`
  height: 2rem;
  width: 4rem;
  border: 2px solid ${props => (props.isDark ? '#606060' : '#cbd5e1')};
  border-left: none;
  color: #606060;
  font-size: 1.5rem;
  background-color: ${props => (props.isDark ? '#383838' : '#f4f4f4')};
`
export const HomeBg = styled.div`
  width: 100%;
`
export const UnHomeVideosList = styled.ul`
  list-style-type: none;
  padding: 0px;
  width: 100%;
  @media screen and (min-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
  }
`
