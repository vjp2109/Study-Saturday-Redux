import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStudent } from '../redux/store';

const avgGrade = (tests) => {
  return Math.round(
    tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

//This is no longer needed or being used once this.props is assigned on line 49
// const DUMMY_DATA = {
//   id: 1,
//   fullName: "Student McDummydata",
//   firstName: "Student",
//   lastName: "McDummydata",
//   email: "sm@dummydata.com",
//   tests: [
//     {
//       id: 1,
//       subject: "Computer Science",
//       grade: 45,
//     },
//     {
//       id: 6,
//       subject: "Art",
//       grade: 60,
//     },
//     {
//       id: 12,
//       subject: "ullam",
//       grade: 45,
//     },
//   ],
// };

class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
  }

  // Pay attention to syntax V - this is what you want to be mounted this specific student with this specific ID
  componentDidMount() {
    this.props.loadStudent(this.props.match.params.id)
  }

  render() {
    // CHECK SYNTAX V!! VITAL TO RENDER UP ONE STUDENT ITS NOT THE NAME OF THE ACTION ITS this.props
    const { student } = this.props;
    //SUPER IMPORTANT V its inline if statement YOU NEED THIS
    const hasTests = student.tests && student.tests.length;

    return (
      <div>
        <h3>Detail: {student.fullName}</h3>
        {hasTests ? (
          <React.Fragment>
            <h3>Average grade: {avgGrade(student.tests)}%</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.tests.map((test) => {
                    return (
                      <tr key={test.id}>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <h4>No tests on record.</h4>
        )}
      </div>
    );
  }
}

//Notice the differences between StudentList where we were getting all studentS and singleStudent where we just need one SINGULAR student - it's a different initial state value
const mapStateToProps = (state) => ({
  student: state.student
});

//remember to pass in the ID - its just a parameter
const mapDispatchToProps = (dispatch) => ({
  loadStudent: (id) => dispatch(fetchSingleStudent(id))
})

//this is how to connect components to the store
export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
