import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserIcon from "../../assets/icon/user_icon.svg";

function EmployeeTopbar_search() {
  return (
    <nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
      <div id="Title">
        <h3 className="text-black text-xl font-medium">รายการ</h3>
      </div>
      <div id="Avatar">
        <Avatar className="flex flex-row gap-2">
          <AvatarImage src={UserIcon} />
          <p>นายช่าง ไม่รู้อะไรบ้างเลย</p>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default EmployeeTopbar_search;
