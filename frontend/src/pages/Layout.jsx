import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const NotificationContext = createContext("notification");

export default function Layout() {
  const [isPannelOpened, setIsPannelOpened] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  return (
    <main className='App'>
      <NotificationContext.Provider
        value={{
          isPannelOpened,
          setIsPannelOpened,
          notificationList,
          setNotificationList,
        }}
      >
        <Outlet />
      </NotificationContext.Provider>
    </main>
  );
}
