import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteMovieFromFavorites, selectFavorites } from "./movieListSlice";
import styled from "styled-components";

const StyledMovieList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 0 20px;

  > button {
    background-color: skyblue;
    cursor: pointer;
    padding: 10px;
    text-transform: uppercase;

    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

export function MovieList() {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  return (
    <StyledMovieList>
      <h2>My Movie List</h2>
      <h4>
        Average Budget for {favorites.length} movies:
        {favorites.reduce(
          (prevValue, currentValue) => prevValue + currentValue.budget,
          0
        ) / favorites.length}
      </h4>

      {favorites.map((movie) => (
        <StyledListItem key={movie.id}>
          <h4>Title: {movie.title}</h4>
          <p>Description: {movie.overview}</p>
          <p>Budget: {movie.budget}</p>
          <p>Release Date: {movie.release_date}</p>
          <button onClick={() => dispatch(deleteMovieFromFavorites(movie.id))}>
            delete
          </button>
        </StyledListItem>
      ))}
    </StyledMovieList>
  );
}
