import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:

//the action types define what you are trying to accomplish/get from the database ie. get students, get one student, update student, remove student, remove all students.. FOCUS V
const GOT_STUDENTS = 'GOT_STUDENTS';
const GET_ONE_STUDENT = 'GET_ONE_STUDENT';


// ACTION CREATORS go here:
//this is used to change the state further down within the reducer depending on the type
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students
});

export const oneStudent = (student) => ({
  type: GET_ONE_STUDENT,
  student
})


// THUNK CREATORS go here:
//Here is what is 'fetching' our data from the database to give to our client per their request.
export const fetchStudents = () => async (dispatch) => {
  const {data} = await axios.get('/api/students');
  dispatch(gotStudents(data));
}

//remember to pass in the id V and again pay close attentin to the syntax
export const fetchSingleStudent = (id) => async (dispatch) => {
  const {data} = await axios.get(`api/students/${id}`);
  dispatch(oneStudent(data))
}

// Once you have more than one item in state, you have to use the spread operator in the reducers
const initialState = {
  students: [],
  student: {}
};

// see here we updated both cases with the spread operator
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return {
        ...state,
        students: action.students
      }
    case GET_ONE_STUDENT:
      return {
        ...state,
        student: action.student
      }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;
