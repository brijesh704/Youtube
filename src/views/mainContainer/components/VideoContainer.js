import React, { useEffect, useState } from "react";
import {
  YOUTUBE_VIDEOS_API,
  YOUTUBE_SEARCH_VIDEO,
} from "../../../utils/contants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const currentquery = useSelector((store) => store.search.currentQuery);

  useEffect(() => {
    getVideos();
  }, [currentquery]);

  const getVideos = async () => {
    try {
      let response;
      if (currentquery) {
        response = await fetch(YOUTUBE_SEARCH_VIDEO + currentquery, {
          method: "GET",
        });
      } else {
        response = await fetch(YOUTUBE_VIDEOS_API);
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div
      className={`grid gap-4 p-2 md:p-4 ${
        isMenuOpen
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {videos?.map((video) => {
        const videoId = video.id.videoId || video.id;
        return (
          <Link key={videoId} to={"/watch?v=" + videoId}>
            <VideoCard info={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
