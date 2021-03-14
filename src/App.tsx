import React from "react";
import ConfigModal from "./components/ConfigModal";
import Simulator from "./components/Simulator";

function App() {
  return (
    <div className="App">
      <Simulator communityCount={15} />
      <ConfigModal />
    </div>
  );
}

export default App;
