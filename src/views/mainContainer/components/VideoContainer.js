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
  // console.log("query in video container ", currentquery);

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
        console.log("currquery response", response);
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
      className={`grid gap-2 p-4 ${
        isMenuOpen
          ? "grid-cols-1 md:grid-cols-3 "
          : "grid-cols-1 md:grid-cols-4 ml-2"
      } `}
      // className="flex flex-wrap"
    >
      {/* {
        videos[0]
        // && <AdVideoCard info={videos[0]} />
      } */}
      {videos?.map((video) => {
        // console.log(video.id.videoId);
        const videoId = video.id.videoId || video.id;
        return (
          <Link key={videoId} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
