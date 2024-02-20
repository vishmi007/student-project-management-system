/*
 * FILE: Button.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Data required for side navigation bar
 * REFERENCE: None
 * LAST MOD: 03/08/2023
 */

import {
  faFileLines,
  faHouse,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export const sideNavBarData = [
  {
    title: "Home",
    icon: faHouse,
    targetRoute: "/home",
  },
  {
    title: "Projects",
    icon: faFileLines,
    targetRoute: "/projects",
  },
  {
    title: "Messaging",
    icon: faMessage,
    targetRoute: "/messaging",
  },
];
