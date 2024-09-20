import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../../../utils/contants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    // console.log(json.items);

    setVideos(json?.items);
  };

  // console.log(videos[0]?.statistics);
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
      {videos?.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
