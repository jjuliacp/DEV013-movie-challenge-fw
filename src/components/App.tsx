import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Start from "./Start";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
