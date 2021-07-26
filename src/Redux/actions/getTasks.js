import {GET_TODO_ATTEMPING, GET_TODO_FAILED, GET_TODO_SUCCESS} from '../types';
import axios from 'axios';
import {ServiceURL} from '../../api/api';

export const getTasks = () => {
  return async dispatch => {
    dispatch({type: GET_TODO_ATTEMPING});

    try {
      const {data} = await axios(ServiceURL.getTasks, {method: 'GET'});
      console.log('---- GET_TASKS -----');
      console.log(data.tasks);
      dispatch({type: GET_TODO_SUCCESS, payload: data.tasks});
    } catch (error) {
      dispatch({
        type: GET_TODO_FAILED,
        payload: error.response.data.errors[0],
      });
    }
  };
};
