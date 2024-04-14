import { useState } from "react";
import HomeInput from "./components/HomeInput";
import ChatterBoard from "./components/ChatterBoard";

function App() {
  const [homeState, setHomeState] = useState("home");

  return (
    <>
      <div className="w-screen">
        {homeState === "home" && (
          <HomeInput title="home" onChange={() => setHomeState("board")} />
        )}
        {homeState === "board" && (
          <ChatterBoard title="board" onChange={() => setHomeState("home")} />
        )}
      </div>
    </>
  );
}

export default App;
