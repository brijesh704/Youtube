import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center shadow-sm p-2 ">
      <img
        className="h-8"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="flex justify-evenly items-center">
        <span className="font-bold px-2">{name}</span>
        <div className="">
          <span className="font-thin truncate ">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
