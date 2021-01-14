import axios from 'axios';
import {GET_MOVIE, GET_MOVIE_ERROR} from './types';
const base_url = 'https://www.omdbapi.com/?';

// Get movies
export const fetchMovie = (payload) => async (dispatch) => {
  const config = {
    headers: {},
  };
  try {
    const res = await axios.post(
      `${base_url}t=${payload}&apikey=e1329144`,
      payload,
      config
    );
    console.log(res.data);
    dispatch({
      type: GET_MOVIE,
      payload: res.data,
    });
    if (res.data.Error) {
      dispatch({
        type: GET_MOVIE_ERROR,
        payload: res.data.Error
      });
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
