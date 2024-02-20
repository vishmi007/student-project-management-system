import React, { useContext, useState } from "react";
import {
  faBell,
  faEnvelopeOpen,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NotificationHeader.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { NotificationContext } from "../../pages/Layout";

export default function NotificationHeader() {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { isPannelOpened, setIsPannelOpened, setNotificationList } =
    useContext(NotificationContext);

  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
    setIsPannelOpened(true);
  };

  const { data, refetch } = useQuery({
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("utils/notifications");
        setNotificationList((prev) => {
          if (prev?.length === 0) {
            console.log(prev, res.data);
            return res.data;
          } else if (prev?.length < res.data?.length) {
            console.log(prev, res.data);
            setIsPannelOpened(false);
            return prev;
          } else {
            return prev;
          }
        });
        return res.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: [`getNotifications`],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  function renderEmptyNotifications() {
    return (
      <div className='position-absolute top-50 start-50 translate-middle text-center'>
        <p>You have no nofications yet.</p>
        <div className='mt-3'>
          <FontAwesomeIcon
            icon={faEnvelopeOpen}
            size='xl'
            style={{ fontSize: "3rem", opacity: "0.3" }}
          />
        </div>
      </div>
    );
  }

  function notificationCard(message, timestaamp, index) {
    return (
      <div key={index} className='notification-msg-container'>
        <div className=' d-flex justify-content-between'>
          <p className='notification-content'>{message}</p>
          <p>{timestaamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='notification-header'>
      <div className={`d-flex flex-row-reverse notification-icon`}>
        <div
          className={`p-2 notification-bell-wrapper ${
            isPanelVisible ? "active" : ""
          }`}
          onClick={togglePanel}
        >
          {!isPannelOpened && data?.length > 0 && (
            <div className='notification-circle'></div>
          )}
          <FontAwesomeIcon icon={faBell} size='xl' />
        </div>
      </div>
      <div className='section-divider mt-2'></div>
      {isPanelVisible && (
        <div className='notification-panel'>
          {/* MAIN CONTENT SECTION */}
          <div className='d-flex justify-content-between'>
            <h2>Your Notifications</h2>
            <FontAwesomeIcon
              icon={faRotateRight}
              size='xl'
              style={{ cursor: "pointer" }}
              onClick={refetch}
            />
          </div>
          <div className='section-divider mt-2'></div>
          {data?.length === 0
            ? renderEmptyNotifications()
            : data?.length > 0 &&
              data
                ?.slice()
                ?.reverse()
                ?.map((notification, index) =>
                  notificationCard(
                    notification.content,
                    notification.timestamp,
                    index
                  )
                )}
        </div>
      )}
    </div>
  );
}
