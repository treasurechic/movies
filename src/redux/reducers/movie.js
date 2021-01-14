import {GET_MOVIE} from '../actions/types';


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
    default:
      return state;
  }
}
