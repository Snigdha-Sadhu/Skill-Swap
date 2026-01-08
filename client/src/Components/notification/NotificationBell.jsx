
import { Bell } from "lucide-react";
import { useContext } from "react";
import { Notificationcontext } from "../../Context/Notificationcontext";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const { notifications } = useContext(Notificationcontext);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
      <Bell size={26} />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;

