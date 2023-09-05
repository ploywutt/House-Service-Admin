<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> f7c16a3 (feat: setting font sizes)
=======
import { useNavigate } from "react-router-dom";
>>>>>>> e9d7fca (feat: make sidebar component + style)
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
import CategoryIcon from "../../assets/icon/category.svg";
import HomeServiceIcon from "../../assets/icon/homeservices.png";
import LogoutIcon from "../../assets/icon/logout.svg";
import PromotionIcon from "../../assets/icon/promotion.svg";
import ServiceIcon from "../../assets/icon/service.svg";

export default function AdminSidebar() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
  const navigate = useNavigate();

  // async function signOutUser() {
  //   const { error } = await supabase.auth.signOut();
  //   navigate("/");
  // }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7c16a3 (feat: setting font sizes)
=======
  const navigate = useNavigate();
>>>>>>> e9d7fca (feat: make sidebar component + style)
=======
>>>>>>> 3823fd3 (feat: add logout function waiting for connecting the supabase auth)
=======
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
  return (
    <div id="container" className="w-[240px] h-screen bg-blue-950">
      <div
        id="logo-bg"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
        className="bg-blue-100 mb-7 rounded-xl flex flex-row items-center py-2 px-2.5 gap-1 mx-6 mt-6"
      >
        <img src={HomeServiceIcon} alt="HomeServices Icon" id="logo" />
        <p className="text-blue-600 text-xl font-medium">HomeServices</p>
      </div>
      <div id="menu-list-container">
        <ul className="text-gray-100 h-[calc(100vh-109px)] flex flex-col justify-between pb-16">
          <div id="menu-list">
            <li className="menu" onClick={() => navigate("/categories")}>
              <img src={CategoryIcon} alt="Category Icon" />
              <h5>หมวดหมู่</h5>
            </li>
            <li className="menu" onClick={() => navigate("/services")}>
              <img src={ServiceIcon} alt="Service Icon" />
              <h5>บริการ</h5>
            </li>
            <li className="menu" onClick={() => navigate("/promotions")}>
              <img src={PromotionIcon} alt="Promotion Icon" />
              <h5>Promotion Code</h5>
            </li>
          </div>
          <li className="menu">
            <img src={LogoutIcon} alt="Logout Icon" />
            <h5>ออกจากระบบ</h5>
<<<<<<< HEAD
=======
        className="bg-blue-100 mx-6 mt-6 mb-7 flex flex-row items-center gap-2.5"
=======
        className="bg-blue-100 mb-7 rounded-xl flex flex-row items-center py-2 px-2.5 gap-1 mx-6 mt-6"
>>>>>>> e9d7fca (feat: make sidebar component + style)
      >
        <img src={HomeServiceIcon} alt="HomeServices Icon" id="logo" />
        <p className="text-blue-600 text-xl font-medium">HomeServices</p>
      </div>
      <div id="menu-list-container">
        <ul className="text-gray-100 h-[calc(100vh-109px)] flex flex-col justify-between pb-16">
          <div id="menu-list">
            <li className="menu" onClick={() => navigate("/categories")}>
              <img src={CategoryIcon} alt="Category Icon" />
              <h5>หมวดหมู่</h5>
            </li>
            <li className="menu" onClick={() => navigate("/services")}>
              <img src={ServiceIcon} alt="Service Icon" />
              <h5>บริการ</h5>
            </li>
            <li className="menu" onClick={() => navigate("/promotions")}>
              <img src={PromotionIcon} alt="Promotion Icon" />
              <h5>Promotion Code</h5>
            </li>
          </div>
          <li className="menu">
            <img src={LogoutIcon} alt="Logout Icon" />
<<<<<<< HEAD
            <p>ออกจากระบบ</p>
>>>>>>> f7c16a3 (feat: setting font sizes)
=======
            <h5>ออกจากระบบ</h5>
>>>>>>> e9d7fca (feat: make sidebar component + style)
=======
>>>>>>> 91ffba9f62b9a46305472b27ea0b29db191c7698
          </li>
        </ul>
      </div>
    </div>
  );
}
