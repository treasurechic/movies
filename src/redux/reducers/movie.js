import {GET_MOVIE, GET_MOVIE_ERROR, NOMINATE_MOVIE} from '../actions/types';


const initialState = {
  movies: [],
  nominated: [],
  loading: true,
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        movies: [payload],
        loading: false,
      };
    case GET_MOVIE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case NOMINATE_MOVIE:
      localStorage.setItem('nominatedMovies', JSON.stringify([payload]));
      return {
        ...state,
        nominated: [payload],
        loading: false,
      };
    default:
      return state;
  }
}
