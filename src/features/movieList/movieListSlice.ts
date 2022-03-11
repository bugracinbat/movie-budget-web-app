import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getMovieDetails, getSearchMovieByKeyword } from "./moviesAPI";

export interface MovieListState {
  favorites: any[];
  suggestions: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: MovieListState = {
  favorites: [],
  suggestions: [],
  status: "idle",
};

export const addFavoriteAsync = createAsyncThunk(
  "movie/addFavoriteAsync",
  async (movieId: string) => {
    try {
      const { data } = await getMovieDetails(movieId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchMovieByKeyword = createAsyncThunk(
  "movie/searchMovieByKeyword",
  async (keyword: string) => {
    try {
      const { data } = await getSearchMovieByKeyword(keyword);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    deleteMovieFromFavorites(state, action: PayloadAction<string>) {
      const movieId = action.payload;
      const index = state.favorites.findIndex((movie) => movie.id === movieId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovieByKeyword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovieByKeyword.fulfilled, (state, action) => {
        state.status = "idle";
        state.suggestions = action.payload.results;
      })
      .addCase(addFavoriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
          state.status = "idle";
          state.favorites.push(action.payload);
        }
      });
  },
});

export const { deleteMovieFromFavorites } = movieSlice.actions;

export const selectSuggestions = (state: RootState) => state.movies.suggestions;
export const selectFavorites = (state: RootState) => state.movies.favorites;

export default movieSlice.reducer;
