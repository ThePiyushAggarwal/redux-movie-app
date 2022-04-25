import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { APIKey } from '../../common/apis/MovieApiKey'
import movieApi from '../../common/apis/movieApi'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=dark&type=movie`)
    return response.data.Search
  }
)

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async () => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=friends&type=series`
    )
    return response.data.Search
  }
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
    return response.data
  }
)

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {}
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending')
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      console.log('Fetched Successfully!')
      return { ...state, movies: action.payload }
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Rejected!')
    },
    [fetchAsyncShows.fulfilled]: (state, action) => {
      console.log('Fetched Successfully! shows')
      return { ...state, shows: action.payload }
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, action) => {
      console.log('Fetched Successfully! detail')
      return { ...state, selectMovieOrShow: action.payload }
    },
  },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions

export default movieSlice.reducer
