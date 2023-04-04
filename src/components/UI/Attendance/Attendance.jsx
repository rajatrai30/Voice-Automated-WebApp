import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import "./Attendance.css";

const students = [
  { name: "Krishna", present: false },
  { name: "Rajat", present: false },
  { name: "Aman", present: false },
  { name: "Shivam", present: false },
  { name: "Yash", present: false },
];

class Attendance extends Component {
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
    const { recordedString, attendanceList } = this.state;
    console.log("Recorded string:", recordedString);
    const student = attendanceList.find(
      (s) => s.name.trim().toLowerCase() === recordedString.trim().toLowerCase()
    );
    console.log("Found student:", student);
    if (student) {
      this.setState({
        attendanceList: attendanceList.map((s) =>
          s.name === student.name ? { ...s, present: true } : s
        ),
      });
    }
  };

  render() {
    const { attendanceList, isRecording, loading, recordedString } = this.state;
    return (
      <div className="Attendance">
        <h1 className="text-center py-2">Attendance</h1>
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
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((student, index) => (
                <tr key={student.name}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.present ? "✓" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default hot(Attendance);
