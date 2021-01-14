import axios from 'axios';
import {
  GET_MOVIE,
  NOMINATE_MOVIE,
} from './types';
const base_url = 'http://www.omdbapi.com/?'

// Get movies
export const fetchMovie = (payload) => async (dispatch) => {
    const config = {
      headers: {},
    };
    try {
      const res = await axios.post(`${base_url}t=${payload}&apikey=e1329144`, payload, config);
      console.log(res.data);
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
