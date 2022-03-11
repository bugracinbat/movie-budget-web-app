import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addFavoriteAsync,
  searchMovieByKeyword,
  selectSuggestions,
} from "./movieListSlice";
import styled from "styled-components";

const StyledMovieSearch = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  align-items: stretch;
`;

const StyledSuggestions = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
`;

const StyledSuggestionItem = styled.div`
  border: 1px solid black;
  display: flex;
  padding: 20px;
  margin: 10px;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid black;
  margin: 10px;

  &:focus {
    outline: none;
  }
`;

export function Search() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useAppSelector(selectSuggestions);

  const dispatch = useAppDispatch();

  const updateInput = (input: string) => {
    setSearch(input);

    if (input.length > 2) {
      setShowSuggestions(true);
      dispatch(searchMovieByKeyword(input));
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <StyledMovieSearch>
      <StyledInput
        value={search}
        onChange={(event) => updateInput(event.target.value)}
        placeholder="Search for a movie"
      />
      {showSuggestions && (
        <StyledSuggestions>
          {suggestions?.length > 0 &&
            suggestions?.map((val, idx) => (
              <StyledSuggestionItem
                key={idx}
                onClick={() => dispatch(addFavoriteAsync(val.id))}
              >
                {val.title}
              </StyledSuggestionItem>
            ))}
        </StyledSuggestions>
      )}
    </StyledMovieSearch>
  );
}
