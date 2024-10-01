import React from "react";
import ButtonList from "../../components/ButtonList";
import VideoContainer from "./components/VideoContainer";

const MainContainer = () => {
  return (
    <div className="overflow-hidden">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
