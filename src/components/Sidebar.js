import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg min-w-48 h-lvh">
      <ul className="">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/demo">Demo</Link>
        </li>
        <li> Shorts</li>
        <li> Videos</li>
        <li> Live</li>
      </ul>
      <h1 className="pt-5 font-bold">Subscriptions</h1>
      <ul>
        <li> Music</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
      <h1 className="pt-5 font-bold">Watch Later</h1>
      <ul>
        <li> Music</li>
        <li> Sports</li>
        <li> Gaming</li>
        <li> Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
