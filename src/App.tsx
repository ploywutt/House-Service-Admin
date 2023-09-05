import "./App.css";
import Login from "./pages/Login";
import Category from "./pages/Category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/Category";

function App() {
  return (
    <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
=======
>>>>>>> f7c16a3 (feat: setting font sizes)
=======
        <Route path="/" element={<Login />} />
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
        <Route path="/categories" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
