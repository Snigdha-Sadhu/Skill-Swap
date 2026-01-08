
import { useContext } from "react";
import { Notificationcontext } from "../../Context/Notificationcontext";

const NotificationPage = () => {
  const { notifications } = useContext(Notificationcontext);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map(n => (
        <div
          key={n._id}
          className={`p-4 rounded mb-3 ${
            n.read ? "bg-gray-100" : "bg-blue-50"
          }`}
        >
          <p>{n.text}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
