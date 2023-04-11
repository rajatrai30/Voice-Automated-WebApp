import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import "./Attendance.css";

const students = [
  {
    name: "Krishna",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "B",
    total: 0,
  },

  {
    name: "Rajat",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "B",
    total: 0,
  },
  {
    name: "Aman",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "B",
    total: 0,
  },
  {
    name: "Shivam",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "B",
    total: 0,
  },
  {
    name: "Yash",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "B",
    total: 0,
  },

  {
    name: "Bhavesh",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "A",
    total: 0,
  },

  {
    name: "Ramsha",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "A",
    total: 0,
  },
  {
    name: "Siddhi",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "A",
    total: 0,
  },
  {
    name: "Akshay",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "A",
    total: 0,
  },
  {
    name: "Utkarsha",
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    division: "A",
    total: 0,
  },
];

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      division: "",
      recordedString: null,
      activeInput: null,
      isRecording: false,
      loading: false,
      forceStopped: false,
      formData: {},
      inputHistory: [],
      refs: [],
      showModal: false,
      debugMode: false,
      error: null,
      recognition: null,
      attendanceList: students,
    };
  }

  handleDivisionChange = (event) => {
    const selectedDivision = event.target.value;
    this.setState({
      division: selectedDivision,
      attendanceList: students.filter(
        (student) => student.division === selectedDivision
      ),
    });
  };

  state = {
    recordedString: null,
    activeInput: null,
    isRecording: false,
    loading: false,
    forceStopped: false,
    formData: {},
    inputHistory: [],
    refs: [],
    showModal: false,
    debugMode: false,
    error: null,
    recognition: null,
    attendanceList: students,
  };

  componentDidMount() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onstart = () => {
      this.setState({ loading: true, recordedString: "Listening..." });
    };
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      this.setState({ recordedString: result }, this.handleVoiceCommand);
    };
    recognition.onend = () => {
      this.setState({ loading: false, recordedString: null });
    };
    this.setState({ recognition });
  }

  handleStartRecording = () => {
    const { recognition } = this.state;
    recognition.start();
    this.setState({ isRecording: true });
  };

  handleStopRecording = () => {
    const { recognition } = this.state;
    recognition.stop();
    this.setState({ isRecording: false });
  };

  handleVoiceCommand = () => {
    const { recordedString, attendanceList, selectedLecture } = this.state;
    console.log("Recorded string:", recordedString);
    const student = attendanceList.find(
      (s) => s.name.trim().toLowerCase() === recordedString.trim().toLowerCase()
    );
    console.log("Found student:", student);
    if (student) {
      this.setState({
        attendanceList: attendanceList.map((s) =>
          s.name === student.name ? { ...s, [selectedLecture]: true } : s
        ),
      });
    }
  };

  render() {
    const { division, attendanceList, isRecording, loading, recordedString } =
      this.state;
    const attendanceList2 = students.filter(
      (student) => student.division === division
    );

    return (
      <div className="Attendance">
        <h1 className="text-center py-2">Attendance</h1>
        <div className="Lecture mb-4">
          <div className="DivisionInput">
            <h5 className="text-center">Attendance</h5>
            <label className="DivRadio">
              <input
                type="radio"
                value="A"
                checked={this.state.division === "A"}
                onChange={this.handleDivisionChange}
              />
              <label>TE-A</label>
            </label>
            <label className="DivRadio">
              <input
                type="radio"
                value="B"
                checked={this.state.division === "B"}
                onChange={this.handleDivisionChange}
              />
              <label>TE-B</label>
            </label>
            <div className="mt-4">
              <select
                value={this.state.selectedLecture}
                onChange={(e) =>
                  this.setState({ selectedLecture: e.target.value })
                }
              >
                <option value="">Select a lecture</option>
                <option value="L1">Lecture 1</option>
                <option value="L2">Lecture 2</option>
                <option value="L3">Lecture 3</option>
                <option value="L4">Lecture 4</option>
              </select>
            </div>
          </div>
          <div>
            <label>Date & Time</label>
            <input type="datetime-local" step="1" />
          </div>
        </div>

        <div className="AttendanceVoiceButtons pb-4">
          <button
            onClick={this.handleStartRecording}
            disabled={isRecording}
            className={`button ${isRecording ? "disabled" : ""} ${
              isRecording ? "active" : ""
            }`}
          >
            Start Recording
          </button>
          <button
            onClick={this.handleStopRecording}
            disabled={!isRecording}
            className={`button ${!isRecording ? "disabled" : ""} ${
              !isRecording ? "active" : ""
            }`}
          >
            Stop Recording
          </button>
        </div>

        {loading && <p className="text-dark recordString">{recordedString}</p>}
        <div className="AttendanceTable">
          {attendanceList2.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>L1</th>
                  <th>L2</th>
                  <th>L3</th>
                  <th>L4</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((student, index) => (
                  <tr key={student.name}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.L1 ? "✓" : ""}</td>
                    <td>{student.L2 ? "✓" : ""}</td>
                    <td>{student.L3 ? "✓" : ""}</td>
                    <td>{student.L4 ? "✓" : ""}</td>
                    <td>{student.L1 + student.L2 + student.L3 + student.L4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>Please Select the Respective Division</h5>
          )}
        </div>
      </div>
    );
  }
}
export default hot(Attendance);
