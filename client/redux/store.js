import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:
const GOT_STUDENTS = 'GOT_STUDENTS';

// ACTION CREATORS go here:
export const gotStudents = () => ({
  type: GOT_STUDENTS
})

// THUNK CREATORS go here:
export const fetchStudents = (students) => {
  return async (dispatch) => {
    try{
    const {data} = await axios.get('/api/students')
    dispatch(gotStudents(data))
    } catch(error) {
      console.log(error)
    }
  }
}

const initialState = {
  students: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return action.students
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// dispatch your own actions here to test your store functionality:
store.dispatch({type: 'GOT_STUDENTS'})

// ^ you can see the logs above in your console, thanks to redux-logger!

export default store;
