import CategoryIcon from "../../assets/icon/category.svg";
import HomeServiceIcon from "../../assets/icon/homeservices.png";
import LogoutIcon from "../../assets/icon/logout.svg";
import PromotionIcon from "../../assets/icon/promotion.svg";
import ServiceIcon from "../../assets/icon/service.svg";

export default function AdminSidebar() {
  return (
    <div id="container" className="w-[240px] h-screen bg-blue-950">
      <div
        id="logo-bg"
        className="bg-blue-100 mx-6 mt-6 mb-7 flex flex-row items-center gap-2.5"
      >
        <img src={HomeServiceIcon} alt="HomeServices Icon" id="logo" />
        <p>HomeServices</p>
      </div>
      <div id="menu-list-container">
        <ul id="menu-list" className="text-white">
          <div id="menu-list">
            <li className="menu-list">
              <img src={CategoryIcon} alt="Category Icon" />
              <p>หมวดหมู่</p>
            </li>
            <li className="menu-list">
              <img src={ServiceIcon} alt="Service Icon" />
              <p>บริการ</p>
            </li>
            <li className="menu-list">
              <img src={PromotionIcon} alt="Promotion Icon" />
              <p>Promotion Code</p>
            </li>
          </div>
          <li className="menu-list">
            <img src={LogoutIcon} alt="Logout Icon" />
            <p>ออกจากระบบ</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
