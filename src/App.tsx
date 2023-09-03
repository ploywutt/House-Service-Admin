import "./App.css";
import Login from "./pages/Login";
import Testing from "./pages/Testing";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/testing" element={<Testing />} />  
      </Routes>
    </Router>
  );
}

export default App;
