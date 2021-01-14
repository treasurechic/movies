import {GET_MOVIE, GET_MOVIE_ERROR, ERROR} from '../actions/types';


const initialState = {
  movies: [],
  nominated: [],
  error:'',
  networkError: false,
  loading: true,
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        error: '',
        movies: [payload],
        loading: false,
        networkError: false,
      };
    case GET_MOVIE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        networkError: false,
      };
      case ERROR:
        return{
          ...state,
          networkError: true,
          loading: false,
        }
    default:
      return state;
  }
}
