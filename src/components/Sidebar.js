import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineVideoCamera } from "react-icons/ai";
import {
  MdOutlineMovie,
  MdOutlineMusicNote,
  MdOutlineSportsSoccer,
  MdOutlineVideocam,
} from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { RiVideoLine } from "react-icons/ri";
import { toggleMenu } from "../features/appSlice";

const mainMenu = [
  { label: "Home", to: "/", icon: <AiFillHome /> },
  { label: "Demo", icon: <AiOutlineVideoCamera /> },
  { label: "Shorts", icon: <RiVideoLine /> },
  { label: "Videos", icon: <MdOutlineVideocam /> },
  { label: "Live", icon: <MdOutlineVideocam /> },
];

const subscriptionsMenu = [
  { label: "Music", icon: <MdOutlineMusicNote /> },
  { label: "Sports", icon: <MdOutlineSportsSoccer /> },
  { label: "Gaming", icon: <FaGamepad /> },
  { label: "Movies", icon: <MdOutlineMovie /> },
];

const watchLaterMenu = [
  { label: "Music", icon: <MdOutlineMusicNote /> },
  { label: "Sports", icon: <MdOutlineSportsSoccer /> },
  { label: "Gaming", icon: <FaGamepad /> },
  { label: "Movies", icon: <MdOutlineMovie /> },
];

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  if (!isMenuOpen) return null;
  return (
    <div className="min-h-screen p-4 bg-white shadow-lg min-w-48 ">
      {/* Main Navigation */}
      <ul>
        {mainMenu.map((item, index) => (
          <li key={index} className="p-2 rounded-lg hover:bg-gray-200 ">
            {item.to ? (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center space-x-3 p-2 rounded-lg",
                    isActive ? "bg-gray-300 font-bold " : "bg-white",
                  ].join(" ")
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ) : (
              <li className="flex items-center space-x-3 rounded-lg">
                {item.icon}
                <span>{item.label}</span>
              </li>
            )}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <hr className="my-5 border-gray-300" />

      {/* Subscriptions */}
      <h1 className="text-lg font-bold">Subscriptions</h1>
      <ul className="mt-2">
        {subscriptionsMenu.map((item, index) => (
          <li key={index} className="p-2 rounded-lg hover:bg-gray-200 ">
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <hr className="my-5 border-gray-300" />

      {/* Watch Later */}
      <h1 className="text-lg font-bold">Watch Later</h1>
      <ul className="mt-2">
        {watchLaterMenu.map((item, index) => (
          <li key={index} className="p-2 rounded-lg hover:bg-gray-200">
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
