import React from "react";
import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const { snippet = {}, statistics = {} } = info || {};

  const {
    channelTitle = "Unknown Channel",
    title = "No Title",
    thumbnails = {},
  } = snippet || {};

  const { viewCount = "NA" } = statistics;

  if (!snippet || !thumbnails) return null;
  return (
    <div className="p-2 m-2 rounded-md shadow-lg h-80 mr-14 w-80 gid">
      <img
        className="flex items-center w-full rounded-lg"
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className="flex items-center py-2 font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{viewCount} views</li>
      </ul>
    </div>
  );
};
export default VideoCard;
