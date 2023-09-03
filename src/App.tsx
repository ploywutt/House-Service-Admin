import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
        {/* <Route path="/posts/:id" element={<PostDetail />} /> This is ตัวอย่างคับ*/}
      </Routes>
    </Router>
  );
}

export default App;
