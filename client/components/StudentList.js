import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/store';

// const DUMMY_DATA = [
//   {
//     id: 1,
//     fullName: "Jordan Walke",
//     firstName: "Jordan",
//     lastName: "Walke",
//     email: "jw@react.com",
//   },
//   {
//     id: 2,
//     fullName: "Dan Abramov",
//     firstName: "Dan",
//     lastName: "Avramov",
//     email: "da@react.com",
//   }
// ]

class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStudents();
  }

  render() {
    return (
      //this.props.students is the array that we fetched - we switched out our dummy data with the actual students array
      <ul>
        {this.props.students.map((student) => (
          <li key={student.id}>
            <div>
              <p>Name: {student.fullName}</p>
              <p>Email: {student.email}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

//Just fetching it from the data from our state
//All its doing is accessing this piece of state
const mapStateToProps = (state) => ({
  students: state.students
})

//load in our thunks
// we want to dispatch our props and have access to the fetch students function
const mapDispatchToProps = (dispatch) => ({
  loadStudents: () => dispatch(fetchStudents())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
