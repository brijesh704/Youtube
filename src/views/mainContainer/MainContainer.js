import React from "react";
import ButtonList from "../../components/ButtonList";
import VideoContainer from "./components/VideoContainer";
import { useSelector } from "react-redux";
const MainContainer = () => {
  const user = useSelector((store) => store.user.user);
  console.log(user, "user");
  return (
    <div className="overflow-hidden">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
