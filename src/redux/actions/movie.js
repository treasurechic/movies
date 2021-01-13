import axios from 'axios';
import {
  GET_MOVIE,
  GET_MOVIE_ERROR,
  NOMINATE_MOVIE,
} from './types';
const base_url = 'http://www.omdbapi.com/?i=tt3896198&apikey=e1329144'

// Get movies
export const fetchMovie = (payload) => async (dispatch) => {
    const config = {
      headers: {},
    };
    try {
      const res = await axios.post(`${base_url}`, payload, config);
      console.log(res.data);
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MOVIE_ERROR,
        payload: {
          msg: error,
          status: error
        },
      });
    }
  };

  export const nominateMovie = (payload) => async (dispatch) => {
    try {
      dispatch({
        type: NOMINATE_MOVIE,
        payload:payload,
      });
    } catch (error) {
      console.log(error);
    }
  };