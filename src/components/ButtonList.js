import React from "react";
import Button from "./Button";
const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "Valentines",
  "News",
  "Tech",
  "Travel",
  "Education",
  "Health",
  "Movies",
  "Podcasts",
  "Music",
  "Fitness",
  "Comedy",
  "Science",
  "History",
];

const ButtonList = () => {
  return (
    <div className="flex overflow-x-y-scroll scrollbar-hide space-x-1 p-2">
      {list?.map((b, index) => {
        return <Button key={index} name={b} />;
      })}
    </div>
  );
};

export default ButtonList;
