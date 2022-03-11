import React from "react";
import "./App.css";
import { Search } from "./features/movieList/Search";
import { MovieList } from "./features/movieList/MovieList";
import styled from "styled-components";

const StyledAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  justify-content: flex-start;
  padding: 30px;

  > * {
    padding: 0 20px;
  }
`;

function App() {
  return (
    <StyledAppContainer>
      <Search />
      <MovieList />
    </StyledAppContainer>
  );
}

export default App;
