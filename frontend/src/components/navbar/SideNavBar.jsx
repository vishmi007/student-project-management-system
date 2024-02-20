/*
 * FILE: SideNavBar.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains main side navigation component
 * REFERENCE: None
 * LAST MOD: 03/08/2023
 */

import "./SideNavBar.css";
import Button from "../btns/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { sideNavBarData } from "./navData";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

export default function SideNavBar({ baseRoutePath, nameVal, logo, role }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  // API CALL TO GET USER INFO
  const { data } = useQuery({
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("utils/navbar-user-metadata");
        return res.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["getUserInfo"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return (
    <div className='side-bar fixed-sidebar'>
      <div className='user-details'>
        <div className='user-logo-icon'>{data?.logoText}</div>
        <div className='user-info-container'>
          <div className='user-name'>{data?.name}</div>
          <div className='user-title-role'>{data?.role}</div>
        </div>
      </div>
      <ul className='side-bar-list p-0 '>
        {sideNavBarData.map((value, key) => {
          const route = `${baseRoutePath}${value.targetRoute}`;
          return (
            <li
              id={
                window.location.pathname.includes(route)
                  ? "nav-item-active"
                  : ""
              }
              key={key}
              className={"list-item hover-effect-button"}
              onClick={() => handleNavLinkClick(route)}
            >
              <div id='icon'>
                <FontAwesomeIcon icon={value.icon} size='lg' />
              </div>
              <div id='title'>{value.title}</div>
            </li>
          );
        })}
      </ul>
      <div className='logout-btn-container d-flex flex-column'>
        <ul className='side-bar-list p-0'>
          <li
            id={
              window.location.pathname === `${baseRoutePath}/settings`
                ? "nav-item-active"
                : ""
            }
            className='list-item'
            onClick={() => handleNavLinkClick(`${baseRoutePath}/settings`)}
          >
            <div id='icon'>
              <FontAwesomeIcon icon={faGear} size='lg' />
            </div>
            <div id='title'>Personal Settings</div>
          </li>
        </ul>
        <div className='d-flex justify-content-center'>
          <Button
            color='red'
            labelText='Logout'
            size='medium'
            onClickHandler={logoutHandler}
          ></Button>
        </div>
      </div>
    </div>
  );
}
