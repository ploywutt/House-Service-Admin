
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import NotFoundPage from '../pages/NotFoundPage'
import CategoryAdd from "../pages/CategoryAdd";
import CategorySearch from "../pages/CategorySearch";
import CategoryEdit from "../pages/CategoryEdit";
import CategoryDetail from "../pages/CategoryDetail";
import ServiceAdd from "../pages/ServiceAdd";
import ServiceSearch from "../pages/ServiceSearch";
import ServiceEdit from "../pages/ServiceEdit";
import ServiceDetail from "../pages/ServiceDetail";
import PromotionSearch from "../pages/PromotionSearch";
import PromotionAdd from "../pages/PromotionAdd";
import PromotionEdit from "../pages/PromotionEdit";
import PromotionDetail from "../pages/PromotionDetail";

import EmployeeLayout from "@/components/Employee/EmployeeLayout";
import EmployeeDetail from "./EmployeeDetail";
import Login from "./Login";

function AuthenticationApp() {
  
  return (
    // <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
        <Route element={<Layout />}>
          <Route path="/categories/*">
            <Route path="" element={<CategorySearch />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="detail/:id" element={<CategoryDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/services/*">
            <Route path="" element={<ServiceSearch />} />
            <Route path="add" element={<ServiceAdd />} />
            <Route path="edit/:id" element={<ServiceEdit />} />
            <Route path="detail/:id" element={<ServiceDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/promotions/*">
            <Route path="" element={<PromotionSearch />} /> 
            <Route path="add" element={<PromotionAdd />} /> 
            <Route path="edit/:id" element={<PromotionEdit />} /> 
            <Route path="detail/:id" element={<PromotionDetail />} /> 
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
        <Route element={<EmployeeLayout />}>
          <Route path="/employee" element={<EmployeeDetail />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    // </Router>
  );
}

export default AuthenticationApp;
