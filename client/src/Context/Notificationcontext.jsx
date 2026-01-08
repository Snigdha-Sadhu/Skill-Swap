/*import { createContext, useEffect, useState } from "react";
import socket from "../socket";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

 /* useEffect(() => {
    socket.on("new-request", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => socket.off("new-request");
  }, []);
*/
/*useEffect(() => {
  const handleNewRequest = (request) => {
    console.log("Notification payload:", request);

    setNotifications((prev) => [
      {
        id: request._id,
        message: `New swap request received`,
        read: false,
        request, // keep full request if needed later
      },
      ...prev,
    ]);
  };

  socket.on("new-request", handleNewRequest);

  return () => socket.off("new-request", handleNewRequest);
}, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
import { createContext, useEffect, useState } from "react";
import socket from "../socket";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Notification socket listener attached");

    socket.on("swap-accepted", (data) => {
      console.log("Realtime notification:", data);

      setNotifications(prev => [
        {
          id: Date.now(),
          message: data.message,
          read: false,
        },
        ...prev,
      ]);
    });

    return () => socket.off("swap-accepted");
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};*/
import { createContext, useEffect, useState } from "react";
import socket from "../socket";
import API from "../API/api";

export const Notificationcontext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // load old notifications
  useEffect(() => {
    API.get("/notifications").then(res => {
      setNotifications(res.data);
    });
  }, []);

  // listen real-time
  useEffect(() => {
    socket.on("new-notification", (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => socket.off("new-notification");
  }, []);

  return (
    <Notificationcontext.Provider value={{ notifications, setNotifications }}>
      {children}
    </Notificationcontext.Provider>
  );
};

export default NotificationProvider;


