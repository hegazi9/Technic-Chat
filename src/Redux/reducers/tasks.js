import {
  GET_TODO_ATTEMPING,
  GET_TODO_FAILED,
  GET_TODO_SUCCESS,
} from '../actions/Types';

const INITIAL_STATE = { tasks: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODO_ATTEMPING:
      return { ...INITIAL_STATE };

    case GET_TODO_SUCCESS:
      return { tasks: action.payload };

    case GET_TODO_FAILED:
      return { tasks: action.payload };

    default:
      return state;
  }
};
