import { useEffect, useState } from "react";
import "./App.css";
import VoiceForm from "./components/VoiceForm/VoiceForm";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import Tutorials from "./components/UI/Tutorials/Tutorials";
import Attendance from "./components/UI/Attendance/Attendance";
//import { recognition } from "./voicerecognition";

function App() {
  const history = useHistory();
  const [stopReco, setStopReco] = useState(false);

  // const SpeechRecognition =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;

  // const recognition = new SpeechRecognition();

  // recognition.start();
  // recognition.onresult = (event) => {
  //   const command = event.results[0][0].transcript;
  //   console.log(command);
  //   if (command.includes("go to") || command.includes("navigate to")) {
  //     if (command.includes("home") || command.includes("index")) {
  //       history.push("/");
  //     } else if (
  //       command.includes("contact") ||
  //       command.includes("contact us")
  //     ) {
  //       history.push("/contact");
  //     } else if (
  //       command.includes("tutorials") ||
  //       command.includes("tutorial")
  //     ) {
  //       history.push("/tutorials");
  //     } else if (command.includes("about") || command.includes("about us")) {
  //       history.push("/about");
  //     }
  //   } else if (
  //     command.includes("stop listening") ||
  //     command.includes("stop recognition") ||
  //     command.includes("stop recognizing") ||
  //     command.includes("stop voice controlling") ||
  //     command.includes("stop voice control")
  //   ) {
  //     recognition.stop();
  //     setStopReco(true);
  //   }
  // };

  // recognition.onend = () => {
  //   if (!stopReco) {
  //     recognition.start();
  //   }
  // };
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <VoiceForm />
        </Route>
        <Route exact path="/tutorials">
          <Tutorials />
        </Route>
        <Route exact path="/attendance">
          <Attendance />
        </Route>
        <Route exact path="/contact">
          <h1 className="text-center py-5"> This is Contact Page </h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
