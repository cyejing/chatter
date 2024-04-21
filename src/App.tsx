import { useState } from "react";
import HomeInput from "./components/HomeInput";
import ChatterBoard from "./components/ChatterBoard";

function App() {
  const [homeState, setHomeState] = useState("home");
  function homeSubmit() {
    setHomeState("board");
  }

  function boardBack() {
    setHomeState("home");
  }

  return (
    <>
      <div className="w-screen">
        {homeState === "home" && <HomeInput onSubmit={homeSubmit} />}
        {homeState === "board" && <ChatterBoard onBack={boardBack} />}
      </div>
    </>
  );
}

export default App;
